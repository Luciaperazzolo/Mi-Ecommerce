const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Definimos la ruta para el detalle. El :id es un parámetro dinámico
router.get('/:id', productsController.detalle);
router.get('/category/:name', productsController.categoria);
module.exports = router;
