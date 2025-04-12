<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index() {
        return auth()->user()->tasks()->latest()->get();
    }

    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'status' => 'in:pending,completed',
        ]);

        $task = auth()->user()->tasks()->create([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'status' => $request->status ?? 'pending',
        ]);

        return response()->json(['message' => 'Task created successfully', 'task' => $task]);
    }


    public function update(Request $request, $id) {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'status' => 'required|string|in:pending,completed',
        ]);

        $task = Task::findOrFail($id);

        if ($task->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->update($request->only(['title', 'description', 'due_date', 'status']));

        return response()->json(['message' => 'Task updated successfully', 'task' => $task]);
    }


    public function destroy($id) {
        $task = Task::findOrFail($id);
        if ($task->user_id !== auth()->id()) return response()->json(['message' => 'Unauthorized'], 403);

        $task->delete();
        return response()->json(['message' => 'Deleted']);
    }
}

