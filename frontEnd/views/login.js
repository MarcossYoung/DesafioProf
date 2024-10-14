import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login =()=>{
const handleSubmit = async (e) => {
 const navigate = useNavigate();
  e.preventDefault();
  try {
    const response = await axios.post('/login', formData);
    if (response.data.success) {
        navigate('/')
    }
       } catch (error) {
       if(error.response && error.response.status === 401){
          alert('Usuario o contrasena invalida, prfavor intentar devuelta.')
       }
     else{

         alert('Ocurrio, un error porfavor probar devuelta.');
         }
         }
};

  return (
    <div className="container text-center product-wrapper box-shadow background_amarillo">
      <h1 className="main-title">Login</h1>
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
