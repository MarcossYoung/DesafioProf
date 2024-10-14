import React, { useState } from "react";
import axios from "axios";

const ProductCreation = () => {
  let { ownerId } = useParams();

  const [productData, setProductData] = useState({
    titulo: "",
    bio: "",
    precio: 0,
  });

  const [images, setImages] = useState({
    foto1: null,
    foto2: null,
    foto3: null,
    foto4: null,
  });

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages({
      ...images,
      [e.target.name]: e.target.files[0], // File object for upload
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all text fields
    formData.append("titulo", productData.titulo);
    formData.append("bio", productData.bio);
    formData.append("precio", productData.precio);
    formData.append("ownerId", ownerId); // Pass owner ID here (if logged in user is known)

    // Append each image file if it exists
    Object.keys(images).forEach((key) => {
      if (images[key]) {
        formData.append(key, images[key]);
      }
    });

    try {
      const response = await axios.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Product created successfully", response.data);
    } catch (error) {
      console.error("Error creating product", error);
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
          <label>Price</label>
          <input
            type="number"
            name="precio"
            value={productData.precio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Product Image 1</label>
          <input type="file" name="foto1" onChange={handleImageChange} />
        </div>
        <div>
          <label>Product Image 2</label>
          <input type="file" name="foto2" onChange={handleImageChange} />
        </div>
        <div>
          <label>Product Image 3</label>
          <input type="file" name="foto3" onChange={handleImageChange} />
        </div>
        <div>
          <label>Product Image 4</label>
          <input type="file" name="foto4" onChange={handleImageChange} />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductCreation;
