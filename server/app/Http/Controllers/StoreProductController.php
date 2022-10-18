<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StoreProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Date;

class StoreProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->sub_category_id && $request->store_id) {
            $store_product = Product::with(['productStore', 'photos'])->whereIn("sub_category_id",  explode(',', $request->sub_category_id))->where('name', 'like', '%' . $request->key . "%")->whereHas('productStore', function (Builder $query) use ($request) {
                $query->where('store_id', $request->store_id);
            })->get()->paginate(2);
        } else if ($request->sub_category_id) {
            $store_product = Product::whereIn("sub_category_id",  explode(',', $request->sub_category_id))->where('name', 'like', '%' . $request->key . "%")->with(['productStore', 'photos'])->has('productStore')->get()->paginate(2);
        } else if ($request->store_id) {
            $store_product = Product::with(['productStore', 'photos'])->where('name', 'like', '%' . $request->key . "%")->whereHas('productStore', function (Builder $query) use ($request) {
                $query->whereIn('store_id', explode(",", $request->store_id));
            })->get()->paginate(2);
        } else {
            $store_product = Product::with(['productStore', 'photos'])->where('name', 'like', '%' . $request->key . "%")->has('productStore')->get()->paginate(2);
        }

        return response()->json($store_product);
    }

    public function productInfo($id)
    {
        // return $id;
        $product = Product::where("id", $id)->with(['productStore', 'photos'])->has('productStore')->first();
        return response()->json($product);
    }

    public function storeProductIndex(Request $request)
    {
        $store_product = StoreProduct::where('store_id', $request->store_id)->with("product")->get();
        return response()->json($store_product);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


        // $validator = validator()->make($request->all(), [
        //     'store_id' => 'required',
        //     'product_id' => 'required',
        //     'price' => 'required',
        //     'stock' => 'integer|required',

        // ]);
        // if ($validator->fails()) {
        //     return response()->json([
        //         'message' => 'Add Store Product Faild',
        //     ]);
        // }
        $data = [];
        $err = [];
        $array = $request->all();
        $now = Date::now();
        foreach ($array as $key => $value) {
            if (!empty($value['product_id']) && !empty($value["store_id"]) && !empty($value['price']) && !empty($value['stock'])) {
                $data[$key] = [
                    "product_id" => $value['product_id'],
                    "store_id" => $value["store_id"],
                    "price" => $value['price'],
                    "stock" => $value['stock'],
                    "created_at" => $now,
                    "updated_at" => $now
                ];
            } else {
                $err[$key] = [
                    "product_id" => $value['product_id'],
                    "store_id" => $value["store_id"],
                    "price" => $value['price'],
                    "stock" => $value['stock'],
                    "created_at" => $now,
                    "updated_at" => $now
                ];
            }
        }
        StoreProduct::insert($data);
        $store_product = StoreProduct::where('store_id', $request[0]["store_id"])->with("product")->get();
        return response()->json($store_product);

        // $store_product = new StoreProduct();
        // $store_product->store_id =  $request->store_id;
        // $store_product->product_id =  $request->product_id;
        // $store_product->price =  $request->price;
        // $store_product->stock =  $request->stock;
        // $store_product->save();
        // return response()->json($store_product->where('product_id', $request->product_id)->with('product')->first());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StoreProduct  $storeProduct
     * @return \Illuminate\Http\Response
     */
    public function show(StoreProduct $storeProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StoreProduct  $storeProduct
     * @return \Illuminate\Http\Response
     */
    public function edit(StoreProduct $storeProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StoreProduct  $storeProduct
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // return $request;
        $validator = validator()->make($request->all(), [
            'id' => 'required',
            'price' => 'required',
            'stock' => 'required',

        ]);
        // dd($validator->fails());
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Update Store Product Faild',
            ]);
        }
        $data = StoreProduct::where("id", $request->id)->with("product")->first();
        $data->update([
            'price' => $request->price,
            'stock' => $request->stock
        ]);

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StoreProduct  $storeProduct
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        // return $request;

        $data = StoreProduct::findOrFail($request->id);
        $data->delete();
        return response()->json($data);
    }
}
