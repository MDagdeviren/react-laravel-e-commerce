<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TmpStore extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'address', 'phone_number', 'email', 'user_id'];
}
