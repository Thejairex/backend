<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prize extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'id_raffle',
        'created_at',
        'updated_at',
        'status',
        'id_user_winner',
        'title',
        'description',
        'image',
        'quantity',
        'position',
        'delivered_at',
        'delivered_by',
        'delivery_method',
        'tracking_code',
    ];

    public function raffle()
    {
        return $this->belongsTo(Raffle::class, 'id_raffle');
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'id_ticket');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user_winner');
    }
}
