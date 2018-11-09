<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ScheduleService;

class ScheduleController extends Controller {
    protected $scheduleService;

    public function __construct(ScheduleService $schedule_service) {
        $this->scheduleService = $schedule_service;
    }

    public function index(Request $request, $user_id) {
        return $this->scheduleService->getAll($user_id);
    }

    public function store(Request $request) {
        return $this->scheduleService->createSchedule($request);
    }
    
    public function update(Request $request) {
        return $this->scheduleService->update($request);
    }

    public function destroy(Request $request) {
        return $this->scheduleService->destroy($request);
    }
}
