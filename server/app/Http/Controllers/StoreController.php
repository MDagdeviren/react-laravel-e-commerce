<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\StoreProduct;
use App\Models\TmpStore;
use App\Models\User;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\AddEmployee;
use App\Models\TmpEmployee;
use Illuminate\Support\Facades\Hash;

class StoreController extends Controller
{
    public function getAppeal(Request $request)
    {
        // return $request;
        $appeal = TmpStore::where('user_id', $request->user_id)->first();
        return $appeal;
    }
    //Store Başvuru
    public function application(Request $request)
    {

        $validator = validator()->make($request->all(), [
            'name' => 'required|max:255',
            'address' => 'string|required',
            'phone_number' => 'string|required',
            'email' => 'email|required',
            'user_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Application Store Faild',
            ]);
        }
        $store = new TmpStore();
        $store->name = $request->name;
        $store->address = $request->address;
        $store->phone_number = $request->phone_number;
        $store->email = $request->email;
        $store->user_id = $request->user_id;
        $store->save();
        return response()->json($store);
    }
    //Store Başvuru-Update
    public function applicationUpd(Request $request)
    {

        $validator = validator()->make($request->all(), [
            'name' => 'required|max:255',
            'address' => 'string|required',
            'phone_number' => 'string|required',
            'email' => 'email|required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Application Update Store Faild',
            ]);
        }
        $data = TmpStore::findOrFail($request->id);
        $data->update([
            'name' => $request->name,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
        ]);
        return response()->json($data);
    }
    //Store Başvuru-Delete
    public function applicationDel(Request $request)
    {
        $data = TmpStore::findOrFail($request->id);
        $data->delete();
        return response()->json($data);
    }

    //Store Admin Onayı
    public function approval(Request $request)
    {
        $tmp_store = TmpStore::findOrFail($request->id);
        // return $tmp_store;
        $store = new Store();
        $store->name = $tmp_store->name;
        $store->address = $tmp_store->address;
        $store->phone_number = $tmp_store->phone_number;
        $store->email = $tmp_store->email;
        $store->save();

        $tmp_store->delete();
        $photo_1 = Photo::create([
            'path' => 'default-logo.png',
            'imageable_id' => $store->id,
            'imageable_type' => Store::class,
            'type' => 0

        ]);
        $photo_2 = Photo::create([
            'path' => 'default-cover.jpg',
            'imageable_id' => $store->id,
            'imageable_type' => Store::class,
            'type' => 1

        ]);

        $user = User::findOrFail($tmp_store->user_id);
        // dd($user);
        $user->update([
            'user_level' => 1,
            'store_id' => $store->id,
        ]);
        return $tmp_store;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexTmp() //Admin
    {
        $tmp_store = TmpStore::all();
        return response()->json($tmp_store);
    }
    public function index() //Admin
    {
        $store = Store::all();
        return response()->json($store);
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
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function show(Store $store)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function edit(Store $store)
    {
        //
    }
    //Store INfo with Photos
    public function getStoreInfo($id)
    {
        $store = Store::findOrFail($id)->with("photos")->first();
        return response()->json($store);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // return $request;
        $validator = validator()->make($request->all(), [
            'id' => 'required',
            'name' => 'required|max:255',
            'address' => 'string|required',
            'phone_number' => 'string|required',
            'email' => 'email|required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Update Store Faild',
            ]);
        }
        $store = Store::findOrFail($request->id)->with('photos')->first();
        $store->update([
            'name' => $request->name,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
        ]);
        return response()->json($store);
        /*
        $logo = $request->file('logo');
        $photo1 = $store->photos[0]; //?
        $filename = date('YmdHi') . $logo->getClientOriginalName();
        $logo->move(public_path('product_images/'), $filename);
        $photo1->update([
            'path' => $filename,
            'imageable_id' => $store->id,
            'imageable_type' => Store::class,
            'type' => 0,
        ]);*/
    }
    public function updateLogo(Request $request)
    {
        // return $request;
        $store = Store::findOrFail($request->id)->with('photos')->first();
        // dd($store->photos[0]);
        $logo = $request->file('logo');
        $filename = date('YmdHi') . $logo->getClientOriginalName();
        $logo->move(public_path('store_images/'), $filename);
        // dd($store->photos[0]->path);
        if ($store->photos[0]->path != 'default-logo.png') {
            unlink('store_images/' . $store->photos[0]->path);
        }
        $store->photos[0]->update([
            'path' => $filename
        ]);
        return response()->json($store);
        // return response()->json([
        //     'message' => 'Logo Updated'
        // ]);
    }
    public function updateCover(Request $request)
    {
        $store = Store::findOrFail($request->id)->with('photos')->first();
        // dd($store->photos[0]);
        $cover = $request->file('cover');
        $filename = date('YmdHi') . $cover->getClientOriginalName();
        $cover->move(public_path('store_images/'), $filename);
        if ($store->photos[1]->path != 'default-cover.jpg') {
            unlink('store_images/' . $store->photos[1]->path);
        }
        $store->photos[1]->update([
            'path' => $filename
        ]);
        return response()->json($store);
        // return response()->json([
        //     'message' => 'Cover Updated'
        // ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $user = User::where('store_id', $request->id)->first();
        $user->update([
            'user_level' => 3,
            'store_id' => null
        ]);
        $store = Store::findOrFail($request->id);
        $store->delete();
        return response()->json($store);
    }
    //Devam ET............
    public function addEmployee(Request $request)
    {
        $key = Hash::make($request->id);

        $tmp_employee = new TmpEmployee;
        $tmp_employee->key = $key;
        $tmp_employee->store_admin_id = $request->id;
        $tmp_employee->save();

        // return 'http://localhost:3000/register?key=' . $key;
        $mailInfo = [
            'title' => 'Welcome New Employee',
            'url' => 'http://localhost:3000/register?key=' . $key
        ];

        Mail::to($request->email)->send(new AddEmployee($mailInfo));
        return response()->json([
            'message' => 'Mail has sent.'
        ]);
    }
    public function getEmployees(Request $request)
    {
        $employees = User::where('store_id', $request->store_id)->get();
        return response()->json($employees);
    }
}
