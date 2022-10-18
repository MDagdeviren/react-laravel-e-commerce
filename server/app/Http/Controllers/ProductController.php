<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::with(['subCategory.category', 'photos'])->get();
        return response()->json($products);
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
        // return $request;
        $validator = validator()->make($request->all(), [
            'name' => 'required|unique:products|max:255',
            'sub_category_id' => 'required',
            'description' => 'required',
            // 'fileName' => 'required|min:3|max:3'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Add Product Faild',
            ]);
        }


        $product = new Product;
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->sub_category_id = $request->input('sub_category_id');
        $product->save();
        // $getId = Product::select('id')->where('name', $request->input('name'))->get();
        //Photo
        if ($request->hasFile('fileName')) {
            $type = 1;
            foreach ($request->file('fileName') as $image) {
                $filename = date('YmdHi') . $image->getClientOriginalName();
                $image->move(public_path('product_images/'), $filename);
                Photo::create([
                    'path' => $filename,
                    'imageable_id' => $product->id,
                    'imageable_type' => Product::class,
                    'type' => $type

                ]);
                $type += 1;
            }
        }

        // // dd($request);
        // if ($request->hasFile('image')) {
        //     $file = $request->file('image');
        //     $filename = date('YmdHi') . $file->getClientOriginalName();
        //     $file->move(public_path('Image/'), $filename);
        //     $product->image = $filename;
        // }
        $data = Product::where('name', '=', $request->name)->with(['subCategory.category', "photos"])->first();
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = validator()->make($request->all(), [
            'name' => 'required|max:255',
            'description' => 'required',
            'selectPhoto' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Update Product Faild',
            ]);
        }
        $data = Product::findOrFail($request->id);
        // dd($data->photos);
        foreach ($data->photos as $photo) {

            if ($photo->type == $request->selectPhoto) {
                $photo->update([
                    'type' => 1
                ]);
                continue;
            }
            if ($photo->type == 1) {
                $photo->update([
                    'type' => $request->selectPhoto
                ]);
            }
        }
        $data->update([
            'name' => $request->name,
            'description' => $request->description
        ]);
        // foreach ($data->photos as $photo) {


        // }

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $data = Product::findOrFail($request->id);
        foreach ($data->photos as $photo) {
            $photo->delete();
            unlink('product_images/' . $photo->path);
        }
        //    ;
        $data->delete();
        return response()->json($data);
    }
}
