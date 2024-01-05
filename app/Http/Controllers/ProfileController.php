<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\OAuthMercadoPago;
use App\Models\Suscription;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'type' => $request->user()->type,
        ]);
    }
   
    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        // if (is_string($request->image)) {
        //     $request->image = $request->user()->image;
        // } else {
        //     $image_name = time() .'.'. $request->image->getClientOriginalExtension();
            
        //     $path = public_path('uploads/users/'. $request->user()->id .'/profile/');
    
        //     if(!File::isDirectory($path)){
        //         File::makeDirectory($path, 0777, true, true);
        //     }
        //     $request->image->move($path, $image_name);
    
        //     $old_path = public_path($request->user()->image);
        //     if (File::exists(public_path($old_path))) File::delete($old_path);

        //     $request->image = '/uploads/users/'.$request->user()->id.'/profile/'. $image_name;
        //     $request->user()->image = '/uploads/users/'.$request->user()->id.'/profile/'. $image_name;
        // }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
