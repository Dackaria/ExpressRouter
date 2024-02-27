const express = require('express');
const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');

const app = express();
const PORT = 8080; 
const API_PREFIX = "api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas para productos
app.use(`/${API_PREFIX}/products`, productsRouter);

// Rutas para carritos
app.use(`/${API_PREFIX}/carts`, cartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
