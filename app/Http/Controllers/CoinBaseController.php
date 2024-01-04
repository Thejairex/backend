<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CoinbaseService;

class CoinBaseController extends Controller
{
    public function createCharge()
    {
        $charge = new CoinbaseService();

        // Datos del cargo según la documentación de Coinbase Commerce
        $chargeData = [
            'name' => 'Ticked de Sorteo',
            'description' => 'Este ticket es el que permite que tengas las posibilidad de ganar un premio',
            'pricing_type' => 'fixed_price',
            'local_price' => [
                'amount' => '10.00',
                'currency' => 'USD',
            ],
            'metadata' => [
                'customer_id' => '',
                'customer_name' => ''
            ]

           
        ];

        # Envia los datos para crear un cargo y devuelve una respuesta HTTP
        $response = $charge->createCharge($chargeData);

        return response()->json($response);
    }
}
