import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../UserProvider';

const UserProfile = ({ userId }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  useEffect(() => {
    // Initialize user from local storage or fetch from API
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      axios.get(`/api/users/${userId}`)
        .then(response => setUser(response.data))
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [userId, setUser]);



useEffect(() => {
    const fetchFavorites = async () => {
      const favIds = JSON.parse(localStorage.getItem('Fav')) || [];
      if (favIds.length > 0) {
        try {
          const fetchedFavorites = await Promise.all(
            favIds.map(async (favId) => {
              const response = await axios.get(`/api/products/${favId}`);
              return response.data;
            })
          );
          setFavoritos(fetchedFavorites);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
      setLoadingFavorites(false);
    };

    fetchFavorites();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleDeleteUser = () => {
    axios.delete(`/api/users/${user.id}`)
      .then(() => {
        localStorage.removeItem('user');
        navigate('/users');
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  if (!user) return <p>Loading...</p>;



  return (
    <div className="profile-container">
      <div className="flex">
        <div className="w-35">
          <h2>Usuario: {user.username}</h2>
          <h2>ID: {user.id}</h2>
          <h2>Email: {user.email}</h2>
          <div className="flex text-align">
            <button className="button_1" onClick={handleLogOut}>Log Out</button>
            <button className="button_2" onClick={handleDeleteUser}>Eliminar Usuario</button>
                    {user.role === "ADMIN" && (
            <button className="button_2" onClick={()=> navigate('/admin')}>Admin Page</button>
            )}
          </div>
        </div>
      </div>
       <h2 className="flex text-align">
                  <Link to ={`/products/create`}>Crear Producto</Link>
                </h2>
     <h1>Tus Favoritos</h1>
     <div className="products-container flex">
     {loadingFavorites ? ( <p>Loading favorites...</p>
      ) : favoritos.length > 0 ? (
         favoritos.map(fav => (
           <div key={fav.id} className="product-wrapper flex box-shadow margin-1 text-align ">
             <article className="prodAll">
              <Link to={`/products/${fav.id}`}>
                 <div className="product-content zindex-1">
                   <div>
                     <img
                       className="imgs center w-85 article-img"
                       src={fav.foto1}
                       alt={fav.titulo}
                       style={{ maxWidth: '100px' }}
                     />
                   </div>
                   <p className="style-h4">{fav.titulo}</p>
                   <p className="descripciones">{fav.bio}</p>
                   <p className="precios">Precio: ${fav.precio}</p>
                 </div>
               </Link>
             </article>
           </div>
         ))
       ) : (
         <p>No favorites found.</p>
       )}
     </div>
     </div>
     );


};

export default UserProfile;
