import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login =()=>{
 const navigate = useNavigate();
   const [formData, setFormData] = useState({
     username: '',
     password: ''
   });

   const handleChange = (e) => {
     setFormData({
       ...formData,
       [e.target.name]: e.target.value
     });
   };
const handleSubmit = async (e) => {

  e.preventDefault();
  try {
 const response = await axios.post('http://localhost:8080/api/users/login', formData);
    if (response.status == 200) {
        navigate('/')
    }
       } catch (error) {
       if(error.response && error.response.status === 401){
          alert('Usuario o contrasena invalida, prfavor intentar devuelta.')
       }
     else{

         alert('Ocurrio, un error porfavor probar devuelta.');
         console.log(error)
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
