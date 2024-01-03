<?php

namespace App\Http\Controllers;

use App\Events\NewRaffleDrawDatetime;
use App\Jobs\ExecDrawRaffle;
use App\Models\Members;
use App\Models\Plans;
use App\Models\Raffle;
use App\Models\Ticket;
use App\Models\User;
use App\Notifications\DrawComplete;
use App\Notifications\WinnerPrize;
use Carbon\Carbon;
use Illuminate\Auth\Access\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class RaffleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $raffles = Raffle::with('user:id,username,image')->where('id_user_creator', $user->id)->where('status', 'active')->orderByDesc('created_at')->paginate(3);

        return Inertia::render('Raffles/Index', [
            'raffles' => $raffles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Raffle::class);

        $user = Auth::user();
        return Inertia::render('Raffles/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $members = User::where('id', $user->id)->first()->members()->get('id')->toArray();

        $validated = $request->validate([
            'id_user_creator' => 'required',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|integer',
            'quantity' => 'required|integer|min:1',
            'max_tickets_per_user' => 'required|integer',
            'id_country' => 'required|integer',
            'image_logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_banner' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'draw_date' => 'exclude_if:draw_type,manual|date',
            'draw_type' => [Rule::in(['manual','datetime'])]
        ]);

        $raffle = $request->user()->raffles()->create([
            'id_user_creator' => $validated['id_user_creator'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
            'max_tickets_per_user' => $validated['max_tickets_per_user'],
            'draw_date' => $validated['draw_type'] === 'simple' ? $validated['draw_date'] : null,
            'id_country' => $validated['id_country'],
            'image_banner' => 'url',
            'image_logo' => 'url',
            'status' => $request->status,
            'payment_method' => $request->payment_method,
            'social_networks' => $request->social_networks,
            'draw_type' => $validated['draw_type'],
            'show_others' => $request['show_others']
        ]);

        $image_name_logo = time() .'.'. $request->image_logo->getClientOriginalExtension();
        
        $path = public_path('uploads/'. $validated['id_user_creator'] .'/raffles/'.$raffle->id_raffle.'/logo/');

        if(!File::isDirectory($path)){
            File::makeDirectory($path, 0777, true, true);
        }
        $request->image_logo->move($path, $image_name_logo);

        $image_name_banner = time() .'.'. $request->image_banner->getClientOriginalExtension();
        
        $path = public_path('uploads/'. $validated['id_user_creator'] .'/raffles/'.$raffle->id_raffle.'/banner/');

        if(!File::isDirectory($path)){
            File::makeDirectory($path, 0777, true, true);
        }
        $request->image_banner->move($path, $image_name_banner);

        Raffle::find($raffle->id)->update([
            'image_logo' => '/uploads/'. $validated['id_user_creator'] .'/raffles/'.$raffle->id_raffle.'/banner/'. $image_name_logo,
            'image_banner' => '/uploads/'. $validated['id_user_creator'] .'/raffles/'.$raffle->id_raffle.'/banner/'. $image_name_banner,
        ]);

        if ($user->type === 'org') {
            $tickets_per_member = floor($validated['quantity'] / count($members));
            for ($i = 0; $i < $validated['quantity']; $i++) {
                $mem_index = floor($i / $tickets_per_member);
                Raffle::find($raffle->id)->tickets()->create([
                    'id_raffle' => $raffle->id,
                    'number' => $i,
                    'id_user' => $validated['id_user_creator'],
                    'id_member' => $members[$mem_index]['id']
                ]);
            }
        } else {
            for ($i = 0; $i < $validated['quantity']; $i++) {
                Raffle::find($raffle->id)->tickets()->create([
                    'id_raffle' => $raffle->id,
                    'number' => $i,
                    'id_user' => $validated['id_user_creator'],
                ]);
            }
        }

        return redirect(route('prizes.create', $raffle));
    }

    /**
     * Display the specified resource.
     */
    public function show(Raffle $raffle)
    {
        $this->authorize('view', $raffle);

        return Inertia::render('Raffles/Show', [
            'raffle' => $raffle->load(['user:id,username,image,type', 'prizes:id,id_raffle,title,description,quantity,position,image,tracking_code,id_user_winner']),
            'tickets' => $raffle->tickets()->with(['member', 'purchase.user'])->get()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function invite(Raffle $raffle)
    {
        // $this->authorize('view', $raffle);

        return Inertia::render('Raffles/ShowInvited', [
            'raffle' => $raffle->load(['user:id,username,image', 'tickets:id,id_raffle,number,id_user,id_purchase', 'tickets.purchase.user:username', 'tickets.member:email,name,lastname', 'prizes:id,id_raffle,title,description,quantity,position,image,tracking_code']),
            'tickets' => $raffle->tickets()->with(['member', 'purchase.user'])->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Raffle $raffle)
    {
        $this->authorize('update', $raffle);
        $user = Auth::user();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|integer',
            'quantity' => 'required|integer|min:1' ,
            'max_tickets_per_user' => 'required|integer',
            'draw_date' => 'required|date',
            'id_country' => 'required|integer',
            'image_logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_banner' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $raffle->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
            'max_tickets_per_user' => $validated['max_tickets_per_user'],
            'draw_date' => $validated['draw_date'],
        ]);

        return redirect(route('raffles.index'));
    }

    public function edit(Raffle $raffle)
    {
        $this->authorize('update', $raffle);

        return Inertia::render('Raffles/Edit', [
            'raffle' => $raffle->load('user:id,username,image'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Raffle $raffle)
    {
        $this->authorize('delete', $raffle);
        $raffle->delete();

        return redirect(route('raffles.index'));
    }

    public function draw(Request $request, Raffle $raffle)
    {
        $this->authorize('update', $raffle);
        $tickets = Ticket::all()->where('id_purchase', '!=', null)->where('id_raffle', '==', $raffle->id)->shuffle()->toArray();
        $not_sold_tickets = Ticket::all()->where('id_purchase', '==', null)->where('id_raffle', '==', $raffle->id)->toArray();

        if ($not_sold_tickets != null) {
            foreach ($not_sold_tickets as $ticket) {
                Ticket::where('id', $ticket['id'])->update([
                    'status' => 'not_sold',
                ]);
            }
        }

        for ($i = 0; $i < $raffle->prizes()->count(); $i++) {
            $random_winner = Ticket::all()->where('id', $tickets[array_rand($tickets)]['id'])->first();
            $random_winner->update([
                'id_prize' => $raffle->prizes[$i]->id,
                'status' => 'winner'
            ]);
            $raffle->prizes[$i]->update([
                'id_user_winner' => $random_winner->id_user,
            ]);
            $user = User::find($random_winner->id_user);
            $user->notify(new WinnerPrize($raffle, $raffle->prizes[$i]));
        }

        foreach (array_unique($tickets, SORT_REGULAR) as $ticket) {
            $user = User::find($ticket['id_user']);
            $user->notify(new DrawComplete('Sorteo finalizado!' , 'El sorteo de la rifa "'.$raffle->title.'" ha finalizado, puedes ver los resultados en la sección de premios', $raffle));
        }
        $request->user()->notify(new DrawComplete('Tu sorteo ha finalizado!' , 'El sorteo de la rifa "'.$raffle->title.'" ha finalizado, puedes ver los resultados en la sección de premios', $raffle));

        $raffle->update([
            'status' => 'completed',
        ]);

        return redirect(route('raffles.show', $raffle));
    }
}
