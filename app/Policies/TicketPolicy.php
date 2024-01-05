<?php

namespace App\Policies;

use App\Models\Raffle;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TicketPolicy
{
    public function buy(User $user, Ticket $ticket)
    {
        $response = Raffle::where('id', $ticket->id_raffle)->first()->status === 'active' 
        ? Response::allow()
        : Response::deny('La rifa no está activa.');

        return $response;
    }
}
