<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'id_raffle',
        'id_user',
        'created_at',
        'updated_at',
        'status',
        'id_purchase',
        'id_prize',
        'number',
        'id_member'
    ];

    public function raffle()
    {
        return $this->belongsTo(Raffle::class, 'id_raffle');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function purchase()
    {
        return $this->belongsTo(Purchase::class, 'id_purchase');
    }
}
