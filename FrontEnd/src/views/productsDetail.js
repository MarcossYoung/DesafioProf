import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { productId } = useParams(); // Retrieve `productId` from the URL
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const [product, setProduct] = useState({
    foto1: '',
    foto2: '',
    foto3: '',
    foto4: '',
    titulo: '',
    precio: 0,
    bio: '',
    owner: { id: '' },
  });

  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    axios
      .get(`/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch(err => {
        console.error('Error fetching product details:', err);
        setLoading(false);
      });
  }, [productId]);

  const handleDelete = () => {
    axios
      .delete(`/api/products/delete/${productId}`)
      .then(() => {
        alert('Product deleted successfully!');
        navigate('/products'); // Redirect to product list after deletion
      })
      .catch(err => alert('Error deleting product:', err));
  };

  const handleFav = () => {
    let favList = JSON.parse(localStorage.getItem('Fav')) || [];
    if (!Array.isArray(favList)) {
      favList = [];
    }
    if (!favList.includes(productId)) {
      favList.push(productId);
      localStorage.setItem('Fav', JSON.stringify(favList));
      console.log(`Added product ${productId} to favorites.`);
    } else {
      console.log(`Product ${productId} is already in favorites.`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const images = [product.foto1, product.foto2, product.foto3, product.foto4];

  return (
    <main className="background_amarillo">
      <section>
        <div className="product-wrapper w-65 margin-auto">
          <h1 className="main-title w-100">Detalle de Producto</h1>
          <article className="product flex box-shadow bg-white">
            <div className="w-35">
              {images.map((image, index) => (
                image && (
                  <img
                    key={index}
                    className="imgs"
                    src={image}
                    alt={`${product.titulo} - Image ${index + 1}`}
                    width="200px"
                    style={{ marginBottom: '10px' }}
                  />
                )
              ))}
            </div>
            <div className="w-25 margin-auto text-right">
              <p className="descripciones">Titulo: {product.titulo}</p>
            </div>
            <div className="product-content text-align w-35">
              <p className="style-h4">{product.titulo}</p>
              <p className="descripciones">Owner ID: {product.owner.id}</p>
              <p className="descripciones">Descripción: {product.bio}</p>
              <p className="precios">Precio: ${product.precio}</p>
              <div className="text-align padding-8">
                <button className="button_3" onClick={() => alert('Comprar')}>Comprar</button>
                <button className="button_3" onClick={handleFav}>Agregar al Carrito</button>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex text-align padding-8">
        {user.id === product.owner.id && (
          <button className="button_2" onClick={handleDelete}>Eliminar</button>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
