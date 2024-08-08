document.addEventListener('DOMContentLoaded', () => {
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products'); // Ensure this URL is correct
            const products = response.data;

            const productList = document.getElementById('productList');
            if (productList) {
                products.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.innerText = `${product.name} - $${product.price}`;
                    productList.appendChild(productElement);
                });
            }
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    };

    fetchProducts();
});
