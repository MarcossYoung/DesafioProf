import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
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
      const response = await axios.post('/api/users/registro', {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      navigate('/login')
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
           <input id="name" type="text" name="name" value={userData.name} onChange={handleChange} required />
         </div>
         <div className="form-input">
           <label className="main-label" htmlFor="username">usuario </label>
           <input id="username" type="text" name="username" value={userData.username} onChange={handleChange} required />
         </div>
         <div className="form-input">
           <label className="main-label" htmlFor="email">Email </label>
           <input id="email" type="email" name="email" value={userData.email} onChange={handleChange} required />
         </div>
         <div className="form-input">
           <label className="main-label" htmlFor="password">Contraseña </label>
           <input id="password" type="password" name="password" value={userData.password} onChange={handleChange} required />
         </div>
         <div className="form-input">
           <label className="main-label" htmlFor="rePassword">Repetir Contraseña </label>
           <input id="rePassword" type="password" name="rePassword" value={userData.rePassword} onChange={handleChange} required />
         </div>
         <button type="submit">Enviar</button>
       </form>
       <p>{responseMessage}</p>
     </div>
   );
};

export default Register;
