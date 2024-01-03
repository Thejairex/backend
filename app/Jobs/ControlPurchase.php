<?php

namespace App\Jobs;

use App\Models\Purchase;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Date;

class ControlPurchase implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public Purchase $purchase)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $tickets = $this->purchase->tickets()->with('raffle')->get();

        $tickets->each(function ($ticket) {
            $ticket->update([
                'id_purchase' => null,
                'id_user' => $ticket->raffle->id_user_creator,
                'status' => 'available',
            ]);
        });

        $this->purchase->update([
            'status' => 'cancelled',
            'cancelled_at' => Date::now()
        ]);
    }
}
