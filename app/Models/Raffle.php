<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Raffle extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'id_user_creator',
        'id_country',
        'title',
        'description',
        'image_banner',
        'image_logo',
        'price',
        'quantity',
        'created_at',
        'updated_at',
        'status',
        'payment_method',
        'social_networks',
        'draw_date',
        'max_tickets_per_user',
        'tickets_sold',
        'draw_type',
        'show_others'
    ];

    public function country()
    {
        return $this->belongsTo(Country::class, 'id_country');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user_creator');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'id_raffle');
    }

    public function prizes()
    {
        return $this->hasMany(Prize::class, 'id_raffle');
    }

}
