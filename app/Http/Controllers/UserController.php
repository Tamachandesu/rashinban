<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller {
    protected $userService;
    
    public function __construct(UserService $user_service) {
        $this->userService = $user_service;
    }

    public function getUser() {
        return $this->userService->getAll();
    }

    public function index() {
        return $this->userService->getAuthenticatedUser();
        
    }

    public function signin(Request $request) {
        return $this->userService->authenticate($request);
    }

    public function signup(Request $request) {
        return $this->userService->register($request);
    }

    public function refreshToken() {
        return $this->userService->refreshToken();
    }
}
