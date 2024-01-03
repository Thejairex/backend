<?php

use App\Http\Controllers\MembersController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\OAuthMercadoPagoController;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\PrizeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\RaffleController;
use App\Http\Controllers\SuscriptionController;
use App\Http\Controllers\SuscriptionPaymentController;
use App\Http\Controllers\TicketController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
})->name('about-us');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('raffles', RaffleController::class)
    ->only(['index', 'store', 'update', 'destroy', 'create', 'show', 'edit'])
    ->middleware(['auth', 'verified']);

Route::post('/raffles/{raffle}/draw', [RaffleController::class, 'draw'])->name('raffles.draw')->middleware(['auth', 'verified']);

Route::get('/raffles/invite/{raffle}', [RaffleController::class, 'invite'])->name('raffles.show.invited')->middleware(['auth', 'verified']);

Route::get('/ticket/buy/{raffle}', [TicketController::class, 'buy'])->name('ticket.buy')->middleware(['auth', 'verified']);
Route::get('/ticket/buy/{raffle}/{member}', [TicketController::class, 'buybymember'])->name('ticket.buybymember')->middleware(['auth', 'verified']);

Route::get('/raffles/{raffle}/prize/create', [PrizeController::class, 'create'])->name('prizes.create')->middleware(['auth', 'verified']);
Route::get('/prize/{prize}/edit', [PrizeController::class, 'edit'])->name('prizes.edit')->middleware(['auth', 'verified']);
Route::post('/prize/{prize}', [PrizeController::class, 'update'])->name('prizes.update')->middleware(['auth', 'verified']);

Route::resource('prizes', PrizeController::class)
    ->only(['store', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('purchases', PurchaseController::class)
    ->only(['store', 'index', 'show'])
    ->middleware(['auth', 'verified']);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/users/{user}', [ProfileController::class, 'show'])->name('profile.show')->middleware(['auth', 'verified']);

Route::get('/profile/notifications', [NotificationsController::class, 'index'])->name('notifications.index')->middleware(['auth', 'verified']);
Route::get('/profile/notifications/{notification}', [NotificationsController::class, 'show'])->name('notifications.show')->middleware(['auth', 'verified']);
Route::post('/profile/notifications/{notification}', [NotificationsController::class, 'update'])->name('notifications.markAsRead')->middleware(['auth', 'verified']);
Route::delete('/profile/notifications/{notification}', [NotificationsController::class, 'destroy'])->name('notifications.destroy')->middleware(['auth', 'verified']);
Route::post('/profile/notifications', [NotificationsController::class, 'markAsRead'])->name('notifications.markAsReadAll')->middleware(['auth', 'verified']);


Route::post('/webhook', [PurchaseController::class, 'webhook'])->name('purchase.webhook');

require __DIR__ . '/auth.php';