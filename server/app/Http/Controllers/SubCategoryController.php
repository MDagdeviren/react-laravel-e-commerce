<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sub_categories = SubCategory::all();
        return response()->json($sub_categories);
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
        $validator = validator()->make($request->all(), [
            'name' => 'required|unique:sub_categories|max:255',
            'category_id' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Add Sub Category Faild',
            ], 422);
        }
        $sub_category = new SubCategory;
        $sub_category->category_id = $request->category_id;
        $sub_category->name = $request->name;
        $sub_category->save();
        $data = SubCategory::where('name', '=', $request->name)->with('category')->first();
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SubCategory  $subCategory
     * @return \Illuminate\Http\Response
     */
    public function show(SubCategory $subCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SubCategory  $subCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(SubCategory $subCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SubCategory  $subCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = validator()->make($request->all(), [
            'name' => 'required|max:255',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Update Category Faild',
            ]);
        }
        $data = SubCategory::findOrFail($request->id);
        $data->update([
            'name' => $request->name
        ]);
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SubCategory  $subCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $data = SubCategory::findOrFail($request->id);
        $data->delete();
        return response()->json($data);
    }
}
