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
        Schema::create('prizes', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->timestamps();
            $table->foreignUlid('id_raffle')->constrained('raffles')->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->string('image');
            $table->integer('quantity');
            $table->integer('position');
            $table->date('delivered_at')->nullable();
            $table->foreignUuid('delivered_by')->nullable()->constrained('users')->cascadeOnDelete();
            $table->string('delivery_method')->nullable();
            $table->string('tracking_code')->unique();
            $table->foreignUuid('id_user_winner')->nullable()->constrained('users')->cascadeOnDelete();
            $table->boolean('status')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prices');
    }
};
