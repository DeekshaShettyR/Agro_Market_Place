


// Farmer Login Form
document.getElementById('farmer-login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('farmer-email').value;
    const password = document.getElementById('farmer-password').value;

    const response = await fetch('http://localhost:2200/login', { // Corrected port number
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    alert(result.message);
});

// Buyer Login Form
document.getElementById('buyer-login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('buyer-email').value;
    const password = document.getElementById('buyer-password').value;

    const response = await fetch('http://localhost:2200/buyer-login', { // Corrected port number
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    alert(result.message);
});

// Add Product Form
document.getElementById('add-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const quantity = document.getElementById('product-quantity').value;
    const farmer_id = document.getElementById('farmer-id').value;

    const response = await fetch('http://localhost:2200/products', { // Corrected port number
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, quantity, farmer_id })
    });

    const result = await response.json();
    alert(result.message);
});

// View Products
document.getElementById('view-products').addEventListener('click', async () => {
    const response = await fetch('http://localhost:2200/products'); // Corrected port number
    const products = await response.json();
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';
    products.forEach(product => {
       // productsList.innerHTML += `<p>${product.name} -  ₹${product.price per } product-id${product.id}  (${product.quantity} kg available)</p>`;
       productsList.innerHTML += `<p>
       ${product.name} <br>
       ₹${product.price } <br>
       Product ID: ${product.id} <br>
       ${product.quantity} kg available
   </p>`;
   
    });
});

// Place Order Form
document.getElementById('place-order-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const buyer_id = document.getElementById('buyer-id').value;
    const product_id = document.getElementById('product-id').value;
    const quantity = document.getElementById('order-quantity').value;

    const response = await fetch('http://localhost:2200/orders', { // Corrected port number
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buyer_id, product_id, quantity })
    });

    const result = await response.json();
    alert(result.message);

    // Optionally refresh the product list after placing the order
    document.getElementById('view-products').click();
});
// Rating Form Submission
document.getElementById('rating-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const buyer_id = document.getElementById('rating-buyer-id').value;
    const product_id = document.getElementById('rating-product-id').value;
    const rating = document.getElementById('rating-value').value;
    const review = document.getElementById('rating-review').value;

    const response = await fetch('http://localhost:2200/ratings', { // Adjusted endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buyer_id, product_id, rating, review })
    });

    const result = await response.json();
    alert(result.message);
});

