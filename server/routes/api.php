<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\StoreProductController;
// use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('/user', function (Request $request) {
//     return '$request->user();';
// });

// Route::group([

//     'middleware' => 'api',
//     'prefix' => 'auth',
//     'namespace' => 'App\Http\Controllers'

// ], function ($router) {


// });

//Auth
Route::middleware(['api'])->prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});
//All User
Route::middleware(['auth:api'])->group(function () {
    //Store Application (Başvuru)
    Route::post('store/getAppeal', [StoreController::class, 'getAppeal']);
    Route::post('store/application', [StoreController::class, 'application']);
    Route::post('store/postAppeal', [StoreController::class, 'applicationUpd']);
    Route::delete('store/application', [StoreController::class, 'applicationDel']);
});
//Only Admin
Route::middleware(['auth:api', 'isAdmin'])->group(function () {
    //Category

    Route::post('category', [CategoryController::class, 'store']);
    Route::put('category', [CategoryController::class, 'update']);
    Route::delete('category', [CategoryController::class, 'destroy']);

    //SubCategory
    Route::post('subCategory', [SubCategoryController::class, 'store']);
    Route::put('subCategory', [SubCategoryController::class, 'update']);
    Route::delete('subCategory', [SubCategoryController::class, 'destroy']);
    //Product
    Route::post('product', [ProductController::class, 'store']);
    Route::put('product', [ProductController::class, 'update']);
    Route::delete('product', [ProductController::class, 'destroy']);

    //Admin onayı
    Route::post('store/approval', [StoreController::class, 'approval']);
    //Admin-Onaylanacak Store Listesi
    Route::get('approvalList', [StoreController::class, 'indexTmp']);
    //Admin Store Listesi
    Route::get('storeList', [StoreController::class, 'index']);
});
//Only Store-Owner
Route::middleware(['auth:api', 'isOwner'])->group(function () {
    //Store-Product-Managemenent Store-Admin
    Route::post('getStoreProducts', [StoreProductController::class, 'storeProductIndex']);
    Route::post('storeProduct', [StoreProductController::class, 'store']);
    Route::put('storeProduct', [StoreProductController::class, 'update']);
    Route::delete('storeProduct', [StoreProductController::class, 'destroy']);

    //Store-Management Store-Admin
    Route::get('store/{id}', [StoreController::class, 'getStoreInfo']);
    Route::post('store', [StoreController::class, 'update']);
    Route::delete('store', [StoreController::class, 'destroy']);
    Route::post('store/updateLogo', [StoreController::class, 'updateLogo']);
    Route::post('store/updateCover', [StoreController::class, 'updateCover']);
    //Store-Employee-Management Store-Admin
    Route::post('store/addEmployee', [StoreController::class, 'addEmployee']);
    Route::post('store/getEmployees', [StoreController::class, 'getEmployees']);
});
//Only Employee

//Eksik

//Gets
Route::get('categories', [CategoryController::class, 'index']);
Route::get('subCategories', [SubCategoryController::class, 'index']);
Route::get('products', [ProductController::class, 'index']);
//Get Home Categories
Route::get('categoriesHome', [CategoryController::class, 'homeIndex']);

//Home
Route::get('storeFilter', [HomeController::class, 'indexStores']);
// Route::get('otherStores/{id}', [HomeController::class, 'otherStores']);



//All Store Products
Route::get('storeProduct', [StoreProductController::class, 'index']);
Route::get('productInfo/{id}', [StoreProductController::class, 'productInfo']);
