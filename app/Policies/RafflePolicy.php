<?php

namespace App\Policies;

use App\Models\Raffle;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RafflePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        return Response::allow();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Raffle $raffle)
    {
        return $user->id === $raffle->id_user_creator
            ? Response::allow()
            : Response::deny('You do not own this raffle.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        $final = $user->type === 'administrator'
        ? Response::allow()
        : Response::deny('NOT ADMIN');

        return $final;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Raffle $raffle)
    {
        return $user->id === $raffle->id_user_creator
            ? Response::allow()
            : Response::deny('You do not own this raffle.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Raffle $raffle)
    {
        return $user->id === $raffle->id_user_creator
            ? Response::allow()
            : Response::deny('You do not own this raffle.');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Raffle $raffle)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Raffle $raffle)
    {
        return $user->id === $raffle->id_user_creator
            ? Response::allow()
            : Response::deny('You do not own this raffle.');
    }
}
