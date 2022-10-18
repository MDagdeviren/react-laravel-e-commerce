<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // /**
    //  * Create a new AuthController instance.
    //  *
    //  * @return void
    //  */
    // public function __construct()
    // {
    //     $this->middleware('auth:api');
    // }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $sub_categories = SubCategory::with('category')->orderBy('category_id', 'ASC')->get();
        $categories = Category::all();
        return response()->json($categories);
    }
    public function homeIndex()
    {
        // $sub_categories = SubCategory::with('category')->orderBy('category_id', 'ASC')->get();
        $categories = Category::with("subCategories")->has('subCategories')->get();
        return response()->json($categories);
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
            'name' => 'required|unique:categories|max:255',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Add Category Faild',
            ]);
        }
        $request->validate([]);
        $category = new Category;
        $category->name = $request->name;
        $category->save();
        return response()->json($category);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $validator = validator()->make($request->all(), [
            'name' => 'required|max:255',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Add Category Faild',
            ]);
        }
        //put
        $data = Category::findOrFail($request->id);
        $data->update([
            'name' => $request->name
        ]);

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //delete
        $data = Category::findOrFail($request->id);
        $data->subCategories->delete();
        $data->delete();
        return response()->json($data);
    }
}
