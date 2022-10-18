<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TmpEmployee extends Model
{
    use HasFactory;
    protected $fillable = ['key', 'store_admin_id'];
}
