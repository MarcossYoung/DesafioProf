import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    imagen: '',
    producto: '',
    precio: 0,
    descripcion: ''
  });


  useEffect(() => {
    // Fetch product data
    axios.get(`/api/products/${productId}`)
      .then(response => setProduct(response.data))
      .catch(err => console.error('Error fetching product:', err));
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProduct(prevProduct => ({ ...prevProduct, imagen: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach(key => {
      formData.append(key, product[key]);
    });

    axios.put(`/api/products/${productId}`, formData)
      .then(response => alert('Product updated successfully!'))
      .catch(err => alert('Error updating product:', err));
  };

  return (
    <div className="product-wrapper w-65 margin-0auto">
      <h1 className="main-title w-100">Editar Producto {product.producto}</h1>
      <article className="product flex box-shadow bg-white">
        <img
          className="imgs w-35"
          src={`/imgProductos/${product.imagen}`}
          alt={product.producto}
          width="200px"
        />
        <form className="w-65" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-input">
            <label className="main-label" htmlFor="producto">Nombre del Producto</label>
            <input
              id="producto"
              type="text"
              name="producto"
              value={product.titulo}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <label className="main-label" htmlFor="bio">Descripción</label>
            <input
              id="descripcion"
              type="text"
              name="descripcion"
              value={product.bio}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <label className="main-label" htmlFor="precio">Precio: $</label>
            <input
              id="precio"
              type="number"
              name="precio"
              value={product.precio}
              onChange={handleChange}
            />
          </div>
          {[1, 2, 3, 4].map(num => (
            <div key={`foto${num}`} className="form-inputFoto">
              <label className="main-label" htmlFor={`foto${num}`}>Foto de Producto</label>
              <input
                id={`foto${num}`}
                type="file"
                name={`foto${num}`}
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
            </div>
          ))}
          <div className="text-center">
            <button className="button_3 margin-5" type="reset">Resetear</button>
            <button className="button_1 margin-5" type="submit">Enviar</button>
          </div>
        </form>
      </article>
    </div>
  );
};

export default EditProduct;
