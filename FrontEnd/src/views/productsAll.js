import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductSearch from '../components/search';
import Filters from '../components/filters';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: "", productType: null });
  const [loading, setLoading] = useState(false);


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/products', {
        params: {
          category: filters.category,
          productType: filters.productType,
        },
      });
      setProducts(response.data.content || response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/products/search', {
        params: { query, page: 0, size: 10 },
      });
      setProducts(response.data.content);
    } catch (err) {
      console.error("Error fetching search results:", err);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (


    <section >
     <div className = "searchbar section_flex ">
          <ProductSearch onSearch={handleSearch} />
        <Filters
          onFilterChange={(newFilters) => {
            console.log("New filters applied:", newFilters);
            setFilters(newFilters);
          }}
        />
          </div>
      <div className="products-container flex">
        {products.map((prod) => (
          <div key={prod.id} className="product-wrapper flex box-shadow margin-1 text-align">
            <article className="prodAll">
              <Link to={`/products/${prod.id}`}>
                <div className="product-content zindex-1">
                  <div>
                    <img
                      className="imgs center w-85 article-img"
                      src={prod.foto1}
                      alt={prod.titulo}
                      style={{ maxWidth: '100px' }}
                    />
                  </div>
                  <p className="style-h4">{prod.titulo}</p>
                  <p className="descripciones">{prod.bio}</p>
                  <p className="descripciones">{prod.rent}</p>
                  <p className="precios">Precio: ${prod.precio}</p>
                </div>
              </Link>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
