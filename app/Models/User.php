<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasUuids;

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function raffles()
    {
        return $this->hasMany(Raffle::class, 'id_user_creator');
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class, 'id_user');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'id_user');
    }

    public function prizes()
    {
        return $this->hasMany(Prize::class, 'id_user_winner');
    }



    public function user_config()
    {
        return $this->belongsTo(UserConfig::class, 'id_user_config');
    }


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'lastname',
        'username',
        'email',
        'password',
        'phone',
        'image',
        'id_country',
        'created_at',
        'updated_at',
        'birthdate',
        'banned',
        'id_user_config',
        'type'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}