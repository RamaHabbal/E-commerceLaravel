<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});
Route::post('/user_cart/{user_id}',[CartController::class,'addCart']);
Route::get('/get-cart-id/{user_id}', [CartController::class, 'getCartId']);


Route::post('/add_cart',[CartItemController::class,'addToCart']);
Route::get('/get_cart/{cart_id}',[CartItemController::class,'getCart']);

Route::get('/products',[ProductController::class,'getProducts']);
Route::get('/get_category',[ProductController::class,'getProductCategories']);
Route::delete('/deleteProduct/{product_id}',[ProductController::class,'deleteProduct']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});