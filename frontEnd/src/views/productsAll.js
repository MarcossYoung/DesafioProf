import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/products')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => setProducts(data))
                .catch(error => setError(error));
        }, []);

        if (error) {
            return <div>Error: {error.message}</div>;
        }
    return (
         <section className="flex">
              {products.map((prod) => (
                <div key={prod.id} className="product-wrapper flex box-shadow margin-1 w-20 text-align">
                  <article className="prodAll">
                    <Link to={`/api/products/${prod.id}`}>
                      <div className="product-content zindex-1">
                        <div>
                          <img
                            className="imgs center w-85 article-img"
                            src={`{prod.foto1}`}
                            alt={prod.product}
                            style={{ maxWidth: '100px' }}
                          />
                        </div>
                        <p className="style-h4">{prod.product}</p>
                        <p className="descripciones">{prod.owner_id}</p>
                        <p className="titulo">
                        {prod.titulo}
                        </p>
                        <p className="titulo">{prod.bio}</p>
                        <p className="precios">Precio: ${prod.precio}</p>
                      </div>
                    </Link>
                  </article>
                </div>
              ))}
            </section>
    );


}

export default Products;
