// src/auth.js

export const isLoggedIn = () => {
    return !!localStorage.getItem('token');
  };
  
  // ...your existing logout function
  export const logout = () => {
    localStorage.removeItem('token');
  };
  