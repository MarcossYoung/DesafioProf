import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserProvider';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('/api/users/login', formData);
      if (response.status === 200) {
        console.log(response);
        const userData = response.data;

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
        setUser(userData);
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Usuario o contrasena invalida, por favor intenta de nuevo.');
      } else {
        setError('Ocurrio un error, por favor prueba de nuevo.');
        console.error(error);
      }
    }
  };

  return (
    <div className="container text-center product-wrapper box-shadow background_amarillo">
      <h1 className="main-title">Login</h1>
      {error && <div className="error-message">{error}</div>} {}
      <form onSubmit={handleSubmit} className="form-input">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>No tienes usuario?</p>
      <a href="/users/registro">Registrate ahora!</a>
    </div>
  );
};

export default Login;
