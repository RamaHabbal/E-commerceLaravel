<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use App\Models\Product;
class ProductController extends Controller
{
    function getProducts(){
        $products = Product::all();
        return response()-> json($products);
    }
     function getProductCategories(){
        $productCategory = DB::table('products')
        ->join('categories', 'products.category_id', '=', 'categories.id')
        ->select('products.*', 'categories.name AS category_name')
        ->get();

        return response()->json($productCategory);
     }
     function deleteProduct($product_id){
        DB::table('products')->where('id', $product_id)->delete();
        return response()->json(['message' => 'Product deleted']);
     }

}
