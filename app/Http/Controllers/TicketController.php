<?php

namespace App\Http\Controllers;

use App\Models\Members;
use App\Models\Raffle;
use App\Models\Ticket;
use Illuminate\Auth\Access\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_raffle' => 'required',
            'number' => 'required|integer',
            'quantity' => 'required|integer'
        ]);

        $tickets = [];

        for ($i = 0; $i < $validated['quantity']; $i++) {
            $tickets[] = [
                'id_raffle' => $validated['id_raffle'],
                'number' => $validated['number'] + $i,
            ];
        }

        $request->raffle()->tickets()->create($tickets);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ticket $ticket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        //
    }

    /**
     * Buy a ticket.
     */
    public function buy(Raffle $raffle, Request $request)
        {
        $this->authorize('buy', Ticket::all()->where('id_raffle', $raffle->id)->first());

        return Inertia::render('Tickets/Buy', [
            'raffle' => Raffle::with([
                'tickets' => [
                    'user:username'
                ],
                'user' => []
            ])->get()->find($raffle->id),
            'status' => session('status'),
            'preferenceId' => session('preferenceId'),
            'isAvaliable' => $raffle->prizes()->count() > 0 && $raffle->prizes()->sum('quantity') > 0
        ]);
    }
}