import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Home from './views/home';
import Register from './views/registro';
import Login from './views/login';
import ProductCreation from './views/productCreateForm';
import Profile from './views/profile';
import Header from './components/header';
import Products from './views/productsAll'
import ProductDetail from './views/productsDetail';
import ProductEdit from './views/productEditForm';



axios.defaults.baseURL = 'http://localhost:8080';

function App() {
  const [user, setUser] = useState(null);
    const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/users/{id}');
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
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/users/registro" element={<Register />} />
          <Route path="/api/users/login" element={<Login setUser={setUser} />} />
          <Route path="/api/create-product" element={user ? <ProductCreation user={user} /> : <Login setUser={setUser} />} />
          <Route path="/api/profile/:id" element={user ? <Profile user={user} /> : <Login setUser={setUser} />} />
          <Route path="/api/products" element={<Products setProduct={setProduct} />} />
          <Route path="/api/products/:productId"  element={<ProductDetail product={product} />}  />
           <Route path="/api/products/edit/:productId" element={<ProductEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
