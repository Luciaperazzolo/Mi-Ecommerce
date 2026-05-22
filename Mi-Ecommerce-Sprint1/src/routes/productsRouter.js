const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Catálogo con todos los productos juntos
router.get('/', productsController.catalogo);

// Filtra al tocar la barra oscura

router.get('/category/:name', productsController.categoria);

// Buscador de productos
// URL: localhost:3000/products/search?query=palabra
router.get('/search', productsController.buscar);
router.get('/create', productsController.crearForm);
// Muestra un solo producto por su ID
// URL: localhost:3000/products/1
router.get('/:id', productsController.detalle);

module.exports = router;
