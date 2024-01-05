<?php

namespace App\Services;

use GuzzleHttp\Client;
class CoinBaseService
{
    protected $client;

    public function __construct()
    // Crea un cliente para poder hacer una peticion HTTP a CoinBase.
    {
        $this->client = new Client([
            'base_uri' => 'https://api.commerce.coinbase.com/',
            'headers' => [
                'Content-Type' => 'application/json',
                'X-CC-Api-Key' => env('COINBASE_API', ''),
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
        $reponseJson = json_decode($response->getBody(), true);

        $url_checkout = $reponseJson['data']['hosted_url'];
        $id_checkout = $reponseJson['data']['id'];

        return ['url_checkout' => $url_checkout, 'id_checkout' => $id_checkout];
    }

    public function showCharge($chargeId){
        // Realizar solicitud GET a la API de Coinbase Commerce para obtener detalles del cargo
        $response = $this->client->get('/charges/' . $chargeId);

        // Manejar la respuesta, por ejemplo, devolver el cuerpo JSON
        
        $responseJson = json_decode($response->getBody(), true);
        return $responseJson['data']['timeline'][0]['status'];
    }

}