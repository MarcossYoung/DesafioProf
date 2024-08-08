const express = require('express');
const path = require('path');
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/users/login', (req, res) => {
    res.render('login');
});
app.get('/users/registro', (req, res) => {
    res.render('registro');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/products', (req, res) => {
    res.render('productsAll');
});
app.get('/productDetail', (req, res) => {
    res.render('productsDetail');
});app.get('/productsEdit/:id', (req, res) => {
       res.render('productsEditForm');
   });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
