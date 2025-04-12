import React from 'react';
import TaskList from '../components/TaskList';
import { logout } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mt-3">
      <h2>Task Dashboard</h2>
      <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>
      <TaskList />
    </div>
  );
}
