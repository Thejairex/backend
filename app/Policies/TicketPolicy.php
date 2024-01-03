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
        $response = $user->id === Raffle::where('id', $ticket->id_raffle)->first()->id_user_creator
        ? Response::deny('No puedes comprar tickets de tu propia rifa.')
        : Response::allow();

        $response = Raffle::where('id', $ticket->id_raffle)->first()->status === 'active' 
        ? $response
        : Response::deny('La rifa no está activa.');

        $response = User::where('id', Raffle::where('id', $ticket->id_raffle)->first()->id_user_creator)->first()->o_auth_mercado_pago()->exists()
        ? $response
        : Response::deny('El creador de la rifa no tiene una cuenta de Mercado Pago asociada.');

        return $response;
    }
}
