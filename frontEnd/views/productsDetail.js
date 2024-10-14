import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState({
    imagen: '',
    producto: '',
    proveedor: '',
    categoria: '',
    precio: 0,
    descripcion: ''
  });

  useEffect(() => {
    axios.get(`/product/${productId}`)
      .then(response => setProduct(response.data))
      .catch(err => console.error('Error fetching product details:', err));
  }, [productId]);

  const handleDelete = () => {
    axios.delete(`/product/delete/${productId}`)
      .then(() => alert('Product deleted successfully!'))
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
              src={`/imgProductos/${product.imagen}`}
              alt={product.producto}
              width="200px"
            />
            <div className="w-25 margin-auto text-right">
              <p className="descripciones">Descripción: {product.descripcion}</p>
            </div>
            <div className="product-content text-align w-35">
              <p className="style-h4">{product.producto}</p>
              <p className="descripciones">{product.proveedor}</p>
              <p className="descripciones">Categoria: {product.categoria}</p>
              <p className="precios">Precio: ${product.precio}.00</p>
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
        <button className="button_1 marginleft-10" onClick={() => window.location.href = `/product/edit/${productId}`}>Editar</button>
        <button className="button_4 marginleft-10" onClick={() => window.location.href = '/product/create'}>Crear</button>
      </div>
    </main>
  );
};

export default ProductDetail;
