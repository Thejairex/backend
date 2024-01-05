<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CoinBaseService;
use Inertia\Inertia;
class CoinBaseController extends Controller
{
    public function createCharge()
    {
        $charge = new CoinBaseService();

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

        // Envia los datos para crear un cargo y devuelve un id y un checkout
        $response = $charge->createCharge($chargeData);

        return Inertia::render('Purchases/Index', [
            'checkout'=> $response['url_checkout'],
            'id_checkout'=> $response['id_checkout'],
        ]);
    }

    // muestra es estado de cargo
    public function showStatusCharge(Request $request){
        $charge = new CoinbaseService();

        $chargeStatus = $charge->showCharge($request);

        return Inertia::render('Purchases/index', [
            'status' => $chargeStatus,
        ]);
    }
}
