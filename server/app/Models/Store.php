<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'address', 'phone_number', 'email'];

    public function photos()
    {
        return $this->morphMany(Photo::class, 'imageable');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function storeProducts()
    {
        return $this->hasMany(StoreProduct::class);
    }
}
