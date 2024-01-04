<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserConfig;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/Register', [
            'org' => $request->query('org', false)
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:'.User::class,
            'phone' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'type' => ['required', Rule::in(['org','simple'])]
        ]);

        $user_config = UserConfig::create([
        ]);

        $user = User::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'username' => $request->username,
            'phone' => $request->phone,
            'id_country' => $request->id_country,
            'birthdate' => $request->birthdate,
            'image' => null,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'id_user_config' => $user_config->id,
            'type' => (string) ($request->type)
        ]);

        $image_name = time() .'.'. $request->image->getClientOriginalExtension();
        
        $path = public_path('uploads/users/'. $user->id .'/profile/');

        if(!File::isDirectory($path)){
            File::makeDirectory($path, 0777, true, true);
        }
        $request->image->move($path, $image_name);

        $user->image = '/uploads/users/'.$user->id.'/profile/'. $image_name;

        $user->save();

        event(new Registered($user));

        Auth::login($user);

        if ($user->type === 'org') return redirect(route('members.create'));

        return redirect(RouteServiceProvider::HOME);
    }
}
