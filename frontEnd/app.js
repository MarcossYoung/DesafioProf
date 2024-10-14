import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import ProductCreation from './views/ProductCreateForm';
import Profile from './views/Profile';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch current logged-in user if session exists
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/users/{id}'); // Replace with your actual endpoint
        setUser(response.data);
      } catch (error) {
        console.log('No user logged in');
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/create-product" element={user ? <ProductCreation user={user} /> : <Login setUser={setUser} />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Login setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
