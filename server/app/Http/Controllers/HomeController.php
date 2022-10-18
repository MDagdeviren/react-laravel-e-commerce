<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Store;
use App\Models\StoreProduct;

class HomeController extends Controller
{
    public function indexStores()
    {
        $store = Store::all();
        return response()->json($store);
    }
}
