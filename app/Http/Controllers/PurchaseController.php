<?php

namespace App\Http\Controllers;

use App\Jobs\ControlPurchase;
use App\Models\Purchase;
use App\Models\Raffle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Services\CoinBaseService;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $purchases = Purchase::with([
            'tickets' => [
                'raffle:id,title,price',
            ]
        ])->where("id_user", auth()->user()->id)->paginate(10);

        return Inertia::render('Purchases/Index', [
            'purchases' => $purchases,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $raffle = Raffle::with('tickets')->find($request->id_raffle);

        $validate = $request->validate([
            "id_user" => "required",
            "quantity" => "required|integer|min:1|max:" . $raffle->max_tickets_per_user,
            "numbers" => "required|string",
            "email" => "required|email",
            "payment_method" => "required|string"
        ]);

        if ($raffle->id_user_creator == $request->id_user) {
            return response()->json([
                'message' => 'You cannot buy tickets from your own raffle'
            ], 400);
        }

        $tickets_to_buy = $raffle->tickets()->get()->filter(function ($ticket) use ($request) {
            return in_array($ticket->number, explode(',', $request->numbers));
        })->filter(function ($temp_ticket) {
            return $temp_ticket->id_purchase == null;
        });

        if ($tickets_to_buy->count() != $request->quantity) {
            return response()->json([
                'message' => 'Some of the tickets you are trying to buy are already taken'
            ], 400);
        }

        $purchase = Purchase::create([
            'id_user' => $request->id_user,
            'quantity' => count(explode(',', $request->numbers)),
            'numbers' => $request->numbers,
            'email' => $request->email,
            'mount' => $request->mount,
            'status' => 'pending',
        ]);

        $tickets_to_buy->each(function ($ticket) use ($purchase) {
            $ticket->update([
                'id_purchase' => $purchase->id,
                'id_user' => $purchase->id_user,
                'status' => 'sold',
            ]);
        });

        ControlPurchase::dispatch($purchase)->delay(now()->addMinutes(10));

        /* $client = new PreferenceClient();
        $preference = $client->create([
            "items" => array(
                array(
                    "title" => "Test",
                    "quantity" => 1,
                    "currency_id" => "BRL",
                    "unit_price" => 10
                )
            )
        ]);

        return redirect()->route('ticket.buy', $raffle->id)->with('preferenceId', $preference->id)->with('status', 'PEDILO'); */
        return redirect()->route('purchases.show', $purchase->id)->with('status', 'Purchase created successfully');

        /* return response()->json([
            'message' => 'Purchase created successfully',
            'purchase' => $purchase,
            'preference_id' => $preference->id
        ], 201); */
    }

    /**
     * Display the specified resource.
     */
    public function show(Purchase $purchase)
    {
        $user = Auth::user();
        $loaded_purchase = $purchase->load([
            'tickets' => [
                'raffle',
            ]
        ]);
        $charge = new CoinBaseService();

        // Datos del cargo según la documentación de Coinbase Commerce
        $chargeData = [
            'name' => 'Ticked de Sorteo',
            'description' => 'Este ticket es el que permite que tengas las posibilidad de ganar un premio',
            'pricing_type' => 'fixed_price',
            'local_price' => [
                'amount' => $loaded_purchase['mount'],
                'currency' => 'USD',
            ],
            'metadata' => [
                'customer_id' => $user->id,
                'customer_name' => $user->username,
                'purchase_id' => $loaded_purchase['id']
            ]
        ];

        // Envia los datos para crear un cargo y devuelve un id y un checkout
        $response = $charge->createCharge($chargeData);
        return Inertia::render('Purchases/Show', [
            'purchase' => $loaded_purchase,
            'checkout' => $response['url_checkout'],
            'id_checkout' => $response['id_checkout'],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Purchase $purchase)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Purchase $purchase)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Purchase $purchase)
    {
        //
    }

    public function webhook(Request $request)
    {
    }
}
