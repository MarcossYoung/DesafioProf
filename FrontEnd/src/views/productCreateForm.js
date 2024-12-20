import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserProvider";
import { useNavigate } from "react-router-dom";

const ProductCreation = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [rentTypes, setRentTypes] = useState([]);

  const [productData, setProductData] = useState({
    titulo: "",
    bio: "",
    precio: 0,
    brand: "",
    sex: "",
    color: "",
    category: "",
    size: 0,
    rent: "",
  });

  const [images, setImages] = useState({
    foto1: null,
    foto2: null,
    foto3: null,
    foto4: null,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes, rentRes] = await Promise.all([
          axios.get("/api/products/categories"),
          axios.get("/api/products/brand"),
          axios.get("/api/products/types"),
        ]);

        setCategories(categoriesRes.data);
        setBrands(brandsRes.data);
        setRentTypes(rentRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages((prevImages) => ({
      ...prevImages,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const token = user?.token || "";
    const formData = new FormData();

    // Append product data
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append images
    Object.entries(images).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post("/api/products/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Product created successfully", response.data);
      navigate(`/profile/${user.id}`);
    } catch (error) {
      console.error("Error creating product", error.response?.data || error);
      setError("Failed to create the product. Please try again.");
    }
  };

  return (
    <div className="product-creation">
      <h1>Create New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="titulo"
            value={productData.titulo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Bio</label>
          <textarea
            name="bio"
            value={productData.bio}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Sex</label>
          <input
            type="text"
            name="sex"
            value={productData.sex}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Rent Type</label>
          <select
            name="rent"
            value={productData.rent}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select Rent Type
            </option>
            {rentTypes.map((rent) => (
              <option key={rent} value={rent}>
                {rent}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Color</label>
          <input
            type="text"
            name="color"
            value={productData.color}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Brand</label>
          <select
            name="brand"
            value={productData.brand}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select Brand
            </option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Size</label>
          <input
            type="number"
            name="size"
            value={productData.size}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            name="precio"
            value={productData.precio}
            onChange={handleInputChange}
            required
          />
        </div>

        {["foto1", "foto2", "foto3", "foto4"].map((foto, index) => (
          <div key={foto}>
            <label>Product Image {index + 1}</label>
            <input
              type="file"
              name={foto}
              onChange={handleImageChange}
            />
          </div>
        ))}

        <button type="submit" disabled={!productData.titulo || !productData.precio}>
          Create Product
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ProductCreation;
