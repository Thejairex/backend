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
        Schema::create('raffles', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->timestamps();
            $table->foreignUuid('id_user_creator')->constrained('users')->cascadeOnDelete();
            $table->foreignId('id_country')->constrained('countries')->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->string('image_banner');
            $table->string('image_logo');
            $table->decimal('price', 8, 2);
            $table->integer('quantity');
            $table->enum('status', ['active', 'completed', 'cancelled', 'pending'])->default('pending');
            $table->string('payment_method');
            $table->string('social_networks');
            $table->timestampTz('draw_date')->nullable();
            $table->integer('max_tickets_per_user');
            $table->integer('tickets_sold')->default(0);
            $table->boolean('show_others');
            $table->enum('draw_type', ['datetime', 'manual'])->default('manual');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('raffles');
    }
};
