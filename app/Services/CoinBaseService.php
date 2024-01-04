<?php

namespace App\Services;

use GuzzleHttp\Client;
class CoinbaseService
{
    protected $client;

    public function __construct()
    // Crea un cliente para poder hacer una peticion HTTP a CoinBase.
    {
        $this->client = new Client([
            'base_uri' => 'https://api.commerce.coinbase.com/',
            'headers' => [
                'Content-Type' => 'application/json',
                'X-CC-Api-Key' => env('COINBASE_API_KEY', ''),
            ]
        ]);
    }

    public function createCharge($data)
    {
        // Realiza la llamada a la api con los datos del controller.
        $response = $this->client->post('/charges', [
            'json' => $data,
        ]);

        // Devuelve JSON.
        return json_decode($response->getBody(), true);
    }

}