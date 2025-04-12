<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',        // ✅ Add all fields you allow for mass assignment
        'description',
        'user_id',
        'status',       // if you have this
        'due_date',     // if using dates
    ];
}
