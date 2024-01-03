<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserConfig extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'id',
        'show_names',
        'show_info',
        'show_image',
        'profile_public',
        'receive_email_notifications',
        'receive_web_notifications',
    ];
    
    public function user()
    {
        return $this->hasOne(User::class,'id_user_config');
    }

}
