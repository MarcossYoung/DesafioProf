import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    rePassword: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.rePassword) {
      setResponseMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users/registro', {
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      setResponseMessage('User registered successfully!');
    } catch (error) {
      setResponseMessage('Error registering user.');
      console.error(error);
    }
  };

  return (
    <div className="container product-wrapper box-shadow background_amarillo">
      <h1 className="main-title w-100">Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label className="main-label" htmlFor="first_name">Nombre </label>
          <input id="first_name" type="text" name="first_name" value={userData.first_name} onChange={handleChange} />
        </div>
        <div className="form-input">
          <label className="main-label" htmlFor="last_name">Apellido </label>
          <input id="last_name" type="text" name="last_name" value={userData.last_name} onChange={handleChange} />
        </div>
        <div className="form-input">
          <label className="main-label" htmlFor="username">Nombre de usuario </label>
          <input id="username" type="text" name="username" value={userData.username} onChange={handleChange} />
        </div>
        <div className="form-input">
          <label className="main-label" htmlFor="email">Email </label>
          <input id="email" type="text" name="email" value={userData.email} onChange={handleChange} />
        </div>
        <div className="form-input">
          <label className="main-label" htmlFor="password">Contraseña </label>
          <input id="password" type="password" name="password" value={userData.password} onChange={handleChange} />
        </div>
        <div className="form-input">
          <label className="main-label" htmlFor="rePassword">Repetir Contraseña </label>
          <input id="rePassword" type="password" name="rePassword" value={userData.rePassword} onChange={handleChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
      <p>{responseMessage}</p>
    </div>
  );
};

export default Register;
