

document.addEventListener('DOMContentLoaded', () => {
   function loadProducts() {
       fetch('/api/products')
           .then(response => response.json())
           .then(data => {
               const productsDiv = document.getElementById('products');
               productsDiv.innerHTML = '';
               data.forEach(product => {
                   const productDiv = document.createElement('div');
                   productDiv.className = 'product';
                   productDiv.innerHTML = `<h2>${product.name}</h2><p>${product.description}</p><p>Price: $${product.price}</p>`;
                   productsDiv.appendChild(productDiv);
               });
           });
   }

   function loadUserProfile() {
       fetch('/api/user/profile')
           .then(response => response.json())
           .then(data => {
               const profileDiv = document.getElementById('profile');
               profileDiv.innerHTML = `<h2>${data.username}</h2><p>${data.email}</p>`;
           });
   }

});
