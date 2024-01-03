<?php

namespace App\Http\Controllers;

use App\Models\Prize;
use App\Models\Raffle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class PrizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Raffle $raffle)
    {
        return Inertia::render('Prizes/Create', [
            'raffle' => $raffle,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'position' => 'required|integer',
            'id_raffle' => 'required',
            'image' => 'required'
        ]);

        $image_name = time() .'.'. $request->image->getClientOriginalExtension();
        
        $path = public_path('uploads/raffles/'.$request->id_raffle.'/prizes_images/'. $request->position);

        if(!File::isDirectory($path)){
            File::makeDirectory($path, 0777, true, true);
        }
        $request->image->move($path, $image_name);

        Raffle::find($request->id_raffle)->prizes()->create([
            'title' => $validate['title'],
            'description' => $validate['description'],
            'quantity' => $validate['quantity'],
            'position' => $validate['position'],
            'id_raffle' => $validate['id_raffle'],
            'image' => '/uploads/raffles/'.$request->id_raffle.'/prizes_images/'. $request->position.'/'.$image_name,
            'tracking_code' => $request->id_raffle . '-' . $validate['position'],
        ]);

        return redirect(route('raffles.show', $request->id_raffle));
    }

    /**
     * Display the specified resource.
     */
    public function show(Prize $prize)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Prize $prize)
    {
        return Inertia::render('Prizes/Edit', [
            'prize' => $prize,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Prize $prize)
    {
        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'position' => 'required|integer',
            'id_raffle' => 'required',
            'image' => 'required'
        ]);

        if (is_string($validate['image'])) {
            $validate['image'] = $prize->image;
        } else {
            $image_name = time() .'.'. $request->image->getClientOriginalExtension();
            
            $path = public_path('uploads/raffles/'.$request->id_raffle.'/prizes_images/'. $request->position);
    
            if(!File::isDirectory($path)){
                File::makeDirectory($path, 0777, true, true);
            }
            $request->image->move($path, $image_name);
    
            $old_prize = Prize::find($prize->id);
            $old_path = public_path($old_prize->image);
            File::delete($old_path);

            $validate['image'] = '/uploads/raffles/'.$request->id_raffle.'/prizes_images/'. $request->position.'/'.$image_name;
        }

        $prize->update([
            'title' => $validate['title'],
            'description' => $validate['description'],
            'quantity' => $validate['quantity'],
            'position' => $validate['position'],
            'id_raffle' => $validate['id_raffle'],
            'image' => $validate['image'],
            'tracking_code' => $request->id_raffle . '-' . $validate['position'],
        ]);

        return redirect(route('raffles.show', $prize->id_raffle));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prize $prize)
    {
        //
    }
}
