// src/components/TaskForm.jsx
import React, { useEffect, useState } from 'react';

export default function TaskForm({ onSubmit, taskToEdit, cancelEdit }) {
  const [form, setForm] = useState({ title: '', description: '', due_date: '', status: 'pending' });

  useEffect(() => {
    if (taskToEdit) {
      setForm({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        due_date: taskToEdit.due_date || '',
        status: taskToEdit.status || 'pending',
      });
    } else {
      setForm({ title: '', description: '', due_date: '', status: 'pending' });
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', description: '', due_date: '', status: 'pending' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="date"
        className="form-control mb-2"
        value={form.due_date}
        onChange={(e) => setForm({ ...form, due_date: e.target.value })}
      />
      <select
        className="form-control mb-2"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <button className="btn btn-primary">
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>

      {taskToEdit && (
        <button type="button" className="btn btn-secondary ms-2" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}
