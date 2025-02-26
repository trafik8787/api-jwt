<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ExampleController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * @param Product $product
     * @return array
     */
    public function products(Product $product): array
    {
        return $this->successResponse($product->all()->toArray(), 200, 'data');
    }
}
