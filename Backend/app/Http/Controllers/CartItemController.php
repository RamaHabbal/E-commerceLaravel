<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartItemController extends Controller
{
    function addToCart(Request $request)
    {
        // Check if the item is already in the cart for the cart_id
        $cartItem = CartItem::where('cart_id', $request->cart_id)
            ->where('product_id', $request->product_id)
            ->first();

        // If the item is already in the cart, update the quantity
        if ($cartItem) {
            $cartItem->update([
                'quantity' => $cartItem->quantity + $request->quantity ?? 1,
            ]);
        } else {
            // If the item is not in the cart, create a new cart item
            $cartItem = CartItem::create([
                'cart_id' => $request->cart_id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity ?? 1,
            ]);
        }

        return response()->json(['message' => 'Item added to the cart successfully', 'cart_item' => $cartItem]);
    }
    function getCart($cart_id)
    {
        $cartItems = DB::table('cart_items')
            ->join('products', 'cart_items.product_id', '=', 'products.id')
            ->where('cart_items.cart_id', $cart_id)
            ->select('cart_items.id', 'cart_items.cart_id', 'cart_items.product_id', 'cart_items.quantity',  'products.*')
            ->get();

            return response()->json(['cart_items' => $cartItems]);
 
    }

}