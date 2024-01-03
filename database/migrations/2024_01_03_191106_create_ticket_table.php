<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
            $table->foreignUlid('id_raffle')->constrained('raffles');
            $table->foreignUuid('id_user')->constrained('users');
            $table->integer('number');
            $table->enum('status', ['available', 'sold', 'winner', 'not_sold'])->default('available');
            $table->foreignUlid('id_prize')->nullable()->constrained('prizes')->cascadeOnDelete();
            $table->foreignUlid('id_purchase')->nullable()->constrained('purchases')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket');
    }
};
