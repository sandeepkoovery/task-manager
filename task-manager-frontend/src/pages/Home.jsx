import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isLoggedIn } from '../auth';


export default function Home() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Welcome to the Task Manager App</h1>

      {loggedIn ? (
        <>
          <Link to="/dashboard" className="btn btn-primary m-2">Go to Dashboard</Link>
          <button onClick={handleLogout} className="btn btn-danger m-2">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="btn btn-success m-2">Login</Link>
          <Link to="/register" className="btn btn-secondary m-2">Register</Link>
        </>
      )}
    </div>
  );
}
