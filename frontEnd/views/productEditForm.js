import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProduct = ({ productId }) => {
    const [product, setProduct] = useState({
        producto: '',
        proveedor: '',
        categoria: '',
        precio: 0,
        descripcion: '',
        imagen: null
    });
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        // Fetch product data
        axios.get('/product/${productId}')
            .then(response => setProduct(response.data))
            .catch(err => console.error('Error fetching product:', err));

        // Fetch categories data
        axios.get('/categories')
            .then(response => setCategorias(response.data))
            .catch(err => console.error('Error fetching categories:', err));
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
        for (let key in product) {
            formData.append(key, product[key]);
        }
        axios.put('/product/${productId}', formData)
            .then(response => alert('Product updated successfully!'))
            .catch(err => alert('Error updating product:', err));
    };

    return (
        <div className="product-wrapper w-65 margin-0auto">
            <h1 className="main-title w-100">Editar Producto {product.producto}</h1>
            <article className="product flex box-shadow bg-white">
                <img
                    className="imgs w-35"
                    src={'/imgProductos/${product.imagen}'}
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
                            value={product.producto}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-input">
                        <label className="main-label" htmlFor="proveedor">Nombre del Proveedor</label>
                        <input
                            id="proveedor"
                            type="text"
                            name="proveedor"
                            value={product.proveedor}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-input">
                        <label className="main-label" htmlFor="categoria">Categoria del Producto</label>
                        <select
                            name="categoria"
                            id="categoria"
                            value={product.categoria}
                            onChange={handleChange}
                        >
                            {categorias.map(cateP => (
                                <option key={cateP.id} value={cateP.id}>
                                    {cateP.categoria}
                                </option>
                            ))}
                        </select>
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
                    <div className="form-input">
                        <label className="main-label" htmlFor="descripcion">Descripción del Producto</label>
                        <textarea
                            id="descripcion"
                            rows="2"
                            cols="35"
                            name="descripcion"
                            value={product.descripcion}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-inputFoto">
                        <label className="main-label" htmlFor="imagen">Foto de Producto</label>
                        <input
                            id="imagen"
                            type="file"
                            name="imagen"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                        />
                    </div>
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
