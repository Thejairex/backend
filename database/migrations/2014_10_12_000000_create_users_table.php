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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('lastname');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string("phone")->nullable();
            $table->string("image")->nullable();
            $table->foreignId("id_country")->nullable()->constrained("countries");
            $table->date("birthdate")->nullable();
            $table->boolean("banned")->default(false);
            $table->foreignUlid('id_user_config')->constrained('user_configs');
            $table->enum('type', ['administrator', 'simple'])->default('simple');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
