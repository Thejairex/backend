<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;

class NotificationsPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function view(User $user, string $id)
    {
        return Auth::user()->notifications()->where("id", $id)->first()->notifiable_id === $user->id ? Response::allow() : Response::deny('You do not own this notification.');
    }
}
