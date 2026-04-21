import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { Loader2 } from 'lucide-react';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const profile = localStorage.getItem('profile');
    
    if (token && profile) {
      setUser(JSON.parse(profile));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/home" />} 
        />
        <Route 
          path="/home" 
          element={user ? <Home user={user} setUser={setUser} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/profile/:id" 
          element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/profile" 
          element={user ? <Navigate to={`/profile/${user._id}`} /> : <Navigate to="/" />} 
        />
        {/* Catch all route - redirect to home or login */}
        <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default App;
