import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data
    axios.get(`/api/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user:', error));

    // Fetch products data
    axios.get(`/api/products?ownerId=${userId}`)
      .then(response => setProductos(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, [userId]);

  const handleEditProfile = () => {
    navigate(`/user/edit/${user.id}`);
  };

  const handleDeleteUser = () => {
    axios.delete(`/api/users/${user.id}`)
      .then(() => navigate('/users'))
      .catch(error => console.error('Error deleting user:', error));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h1>Bienvenido, {user.first_name + ' ' + user.last_name}</h1>
      <div className="flex">
        <div className="w-35">
          <img src={user.avatar} alt="User Avatar" className="article-img" />
          <h2>Usuario: {user.username}</h2>
          <h2>Fecha de Nacimiento: {user.birth_date}</h2>
          <h2>Dirección: {user.address + ', ' + user.city}</h2>
          <h2>Teléfono: {user.phone}</h2>
          <h2>E-mail: {user.email}</h2>
          <h2>Categoria: {user.categoriausers_id}</h2>
          <div className="flex text-align">
            <button className="button_1" onClick={handleEditProfile}>Editar Perfil</button>
            <button className="button_2" onClick={handleDeleteUser}>Eliminar Usuario</button>
          </div>
        </div>
        <div>
          {productos.map((prod) => (
            <div key={prod.id} className="product-wrapper flex box-shadow margin-1 w-85 text-align">
              <article className="prodAll">
                <a href={`/product/detail/${prod.id}`}>
                  <div className="product-content zindex-1">
                    <div>
                      <img
                        className="imgs center w-85 article-img"
                        src={`/imgProductos/${prod.foto1}`}
                        alt={prod.titulo}
                        style={{ maxWidth: '100px' }}
                      />
                    </div>
                    <p className="style-h4">{prod.titulo}</p>
                    <p className="descripciones">{prod.bio}</p>
                    <p className="precios">Precio: ${prod.precio}.00</p>
                  </div>
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
