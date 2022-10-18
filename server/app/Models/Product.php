<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'sub_category_id'];

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }
    public function photos()
    {
        return $this->morphMany(Photo::class, 'imageable');
    }
    public function productStores()
    {
        return $this->hasMany(StoreProduct::class)->orderBy('price');
    }
    public function productStore()
    {
        return $this->belongsToMany(Store::class, 'store_products')->as('info')->withPivot('price', 'stock')->orderBy("price");
    }
}
