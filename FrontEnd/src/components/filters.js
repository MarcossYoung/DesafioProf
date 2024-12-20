import React, { useEffect, useState } from "react";
import axios from "axios";

const Filters = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");

  useEffect(() => {
    // Fetch categories
    axios.get("/api/products/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch product types
    axios.get("/api/products/types")
      .then((response) => setProductTypes(response.data))
      .catch((error) => console.error("Error fetching product types:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ category: selectedCategory, productType: selectedProductType });
  };

  return (
    <form onSubmit={handleSubmit} className="filters">
      <label>
        Category:
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Product Type:
        <select
          value={selectedProductType}
          onChange={(e) => setSelectedProductType(e.target.value)}
        >
          <option value="">All Product Types</option>
          {productTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Aplicar Filtros</button>
    </form>
  );
};

export default Filters;
