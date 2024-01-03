<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'id_user',
        'id_raffle',
        'created_at',
        'updated_at',
        'quantity',
        'numbers',
        'email',
        'mount',
        'status',
        'payment_method',
        'paid_at',
        'cancelled_at',
    ];

    public function raffle()
    {
        return $this->belongsTo(Raffle::class, 'id_raffle');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'id_purchase');
    }
}
