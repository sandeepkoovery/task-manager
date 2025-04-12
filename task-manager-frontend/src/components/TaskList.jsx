// src/components/TaskList.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import TaskForm from './TaskForm';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null); // for edit mode

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEdit = (task) => {
    setTaskToEdit(task);
  };

  const handleSave = async (formData) => {
    if (taskToEdit) {
      // update
      await api.put(`/tasks/${taskToEdit.id}`, formData);
      setTaskToEdit(null);
    } else {
      // create
      await api.post('/tasks', formData);
    }
    fetchTasks();
  };

  const cancelEdit = () => {
    setTaskToEdit(null);
  };

  return (
    <div>
      <h4>{taskToEdit ? 'Edit Task' : 'Add Task'}</h4>
      <TaskForm onSubmit={handleSave} taskToEdit={taskToEdit} cancelEdit={cancelEdit} />

      <h4 className="mt-4">My Tasks</h4>
      {tasks.map(task => (
        <div key={task.id} className="card mb-2">
          <div className="card-body">
          <h5>
            {task.title}{' '}
            <span className={`badge ${task.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
            </h5>
            <p>{task.description}</p>
            <p><strong>Due:</strong> {task.due_date}</p>
            <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(task)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
