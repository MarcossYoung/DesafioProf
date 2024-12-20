import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import axios from 'axios';

import Home from './views/home';
import Register from './views/registro';
import Login from './views/login';
import ProductCreation from './views/productCreateForm';
import Profile from './views/profile';
import Header from './components/header';
import Footer from './components/footer'
import Products from './views/productsAll';
import ProductDetail from './views/productsDetail';
import ProductEdit from './views/productEditForm';
import AdminRoute from './AdminRoute'
import AdminPage from './views/adminPage'

axios.defaults.baseURL = 'http://localhost:8080';

function App() {
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = localStorage.user;
      const user = JSON.parse(userData);
      const token = user ? user.token : null;

      if (!token) {
        console.log('No user logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
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
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login setUser={user} />} />
          <Route
            path="/admin"
            element={
              loading ? (
                <p>Loading...</p>
              ) : (
                <AdminRoute user={user}>
                  <AdminPage />
                </AdminRoute>
              )
            }
          />
          <Route
            path="/products/create"
            element={
              user ? (
                <ProductCreation product={product} setProduct={setProduct} />
              ) : (
                <p>You must be logged in to create a product.</p>
              )
            }
          />
          <Route
            path="/profile/:id"
            element={user ? <Profile user={user} /> : (
                                                            <navigate to="/login" replace />
                                                          )}
          />
          <Route path="/products" element={<Products setProduct={setProduct} />} />
          <Route path="/products/:productId" element={<ProductDetail product={product} />} />
          <Route path="/edit/:productId" element={<ProductEdit />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
