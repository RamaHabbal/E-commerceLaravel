<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Cart;

class CartController extends Controller
{
    function addCart($user_id){

        $cart = Cart::create([
            'user_id' => $user_id,
        ]);
        return response()->json([
            'cart' =>$cart,
            'message'=>'Succefully cart created'
        ]);
    }
}
