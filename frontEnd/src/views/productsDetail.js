import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { productId } = useParams(); // Retrieve `productId` from the URL
  const navigate = useNavigate(); // For navigation after deletion
  const [product, setProduct] = useState({
    imagen: '',
    producto: '',
    precio: 0,
    descripcion: ''
  });

  useEffect(() => {
    axios.get(`/api/products/${productId}`)
      .then(response => setProduct(response.data))
      .catch(err => console.error('Error fetching product details:', err));
  }, [productId]);

  const handleDelete = () => {
    axios.delete(`/api/products/delete/${productId}`)
      .then(() => {
        alert('Product deleted successfully!');
        navigate('/products'); // Redirect to product list after deletion
      })
      .catch(err => alert('Error deleting product:', err));
  };

  return (
    <main className="background_amarillo">
      <section>
        <div className="product-wrapper w-65 margin-auto">
          <h1 className="main-title w-100">Detalle de Producto</h1>
          <article className="product flex box-shadow bg-white">
            <img
              className="imgs w-35"
              src={product.imagen ? `/imgProductos/${product.imagen}` : '/img/default.jpg'}
              alt={product.producto}
              width="200px"
            />
            <div className="w-25 margin-auto text-right">
              <p className="descripciones">Titulo: {product.titulo}</p>
            </div>
            <div className="product-content text-align w-35">
              <p className="style-h4">{product.producto}</p>
              <p className="descripciones">{product.ownerId}</p>
              <p className="descripciones">Descripción: {product.bio}</p>
              <p className="precios">Precio: ${product.precio}</p>
              <div className="text-align padding-8">
                <button className="button_3" onClick={() => alert('Comprar')}>Comprar</button>
                <button className="button_3" onClick={() => alert('Agregar al Carrito')}>Agregar al Carrito</button>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex text-align padding-8">
        <button className="button_2" onClick={handleDelete}>Eliminar</button>
        <button className="button_1 marginleft-10" onClick={() => navigate(`api/products/edit/${productId}`)}>Editar</button>
        <button className="button_4 marginleft-10" onClick={() => navigate('api/products/create')}>Crear</button>
      </div>
    </main>
  );
};

export default ProductDetail;
