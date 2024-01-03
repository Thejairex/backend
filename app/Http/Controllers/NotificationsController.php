<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationsController extends Controller 
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = Auth::user()->notifications()->paginate(5);
        return Inertia::render("Profile/Notifications/Index", [
            "notifications"=> $notifications['data'],
            "pagination"=> $notifications,
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $notification)
    {
        if (!Auth::user()->notifications()->where("id", $notification)->exists())
        {
            return abort(403, 'Unauthorized action.');
        }

        return Inertia::render("Profile/Notifications/Show", [
            "notification"=> Auth::user()->notifications()->where("id", $notification)->first(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id_notification)
    {
        Auth::user()->notifications()->where("id", $id_notification)->first()->markAsRead();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id_notification)
    {
        if (!Auth::user()->notifications()->where("id", $id_notification)->exists())
        {
            return abort(403, 'Unauthorized action.');
        }

        Auth::user()->notifications()->where("id", $id_notification)->first()->delete();

        return redirect()->route("notifications.index");
    }

    public function markAsRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();
    }
}
