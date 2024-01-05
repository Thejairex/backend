<?php

// app/Http/Controllers/WebhookController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;

class WebhookController extends Controller
{

    private function validateCoinbaseWebhook(Request $request)
    {
        $webhookSecret = env('COINBASE_WEBHOOK_SECRET');


        $payload = $request->getContent();
        $signature = $request->header('X-CC-Webhook-Signature');

        $isValid = hash_equals(hash_hmac('sha256', $payload, $webhookSecret), $signature);

        if (!$isValid) {
            abort(403, 'Invalid webhook signature');
        }
    }

    public function handleCoinbaseWebhook(Request $request)
    {
      
        $this->validateCoinbaseWebhook($request);

        $payload = $request->all();

        Log::info('Coinbase Webhook Payload:', $payload);
        return response()->json(['status' => 'success']);
    }
}
