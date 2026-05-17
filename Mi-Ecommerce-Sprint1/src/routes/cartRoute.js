const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const confirmController = require('../controllers/confirmController');

//VER CARRITO
router.get('/', cartController.index); // Antes era getCart
//VER EL CHECKOUT
router.get('/checkout', cartController.getCheckout);
//AGREGAR PRODUCTO AL CARRITO
router.post('/add/:id', cartController.addToCart);
//ELIMINAR PRODUCTO DEL CARRITO
router.post('/update/:id/:action', cartController.updateQuantity);
//VACIAR CARRITO
router.post('/clear', cartController.clearCart);
//CONFIRMAR COMPRA
router.post('/confirm', confirmController.confirmPurchase);

module.exports = router;