document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    if (productList) {
        fetch('/shops')
            .then(response => response.json())
            .then(data => {
                productList.innerHTML = data.map(shop => `
                    <li>
                        <a href="productDetail.html?id=${shop.id}">${shop.name}</a>
                    </li>
                `).join('');
            });
    }

    const createProductForm = document.getElementById('createProductForm');
    if (createProductForm) {
        createProductForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;

            const response = await fetch('/shops', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, price })
            });

            if (response.ok) {
                window.location.href = 'products.html';
            } else {
                alert('Failed to create product');
            }
        });
    }
});
