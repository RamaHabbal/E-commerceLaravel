<?php

namespace App\Http\Controllers;
use Illuminate\Database\QueryException;
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
     function addProduct(Request $request){

        $name = $request->input('name');
        $description = $request->input('description');
        $image = $request->input('image');
        $price = $request->input('price');
        $categoryName = $request->input('category_name');

        $categoryId = DB::table('categories')
            ->where('name', $categoryName)
            ->value('id');

        $toadd = [
            'name' => $name,
            'description' => $description,
            'image' => $image,
            'price' => $price,
            'category_id' => $categoryId,
        ];
    
        DB::table('products')->insert($toadd);
    
    
        return response()->json(['message' => 'Product added successfully']);
      
        // return response()->json(['message' => 'Failed to add product']);
    }
}
