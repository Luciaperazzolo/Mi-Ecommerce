const express = require('express'); //IMportar express para crear rutas.
const router = express.Router(); //Crear una instancia de Router para definir las rutas relacionadas con productos.
const productController = require('../controllers/productController'); //Importar el controlador de productos para manejar la lógica de las rutas.

//Cuando el usuario entra a http://localhost:3000/product/cart
router.get('/cart', productController.getCart);
router.get('/checkout', productController.getCheckout);
router.post('/cart/add/:id', productController.addToCart); //Cuando el usuario envía una solicitud POST a http://localhost:3000/product/cart/add/:id, se llama a la función addToCart del controlador de productos, pasando el ID del producto como parámetro para agregarlo al carrito.
router.post('/cart/update/:id/:action', productController.updateQuantity); //Cuando el usuario envía una solicitud POST a http://localhost:3000/product/cart/update/:id/:action, se llama a la función updateQuantity del controlador de productos, pasando el ID del producto y la acción (incrementar o decrementar) como parámetros para actualizar la cantidad del producto en el carrito.
router.post('/cart/clear', productController.clearCart); //Cuando el usuario envía una solicitud POST a http://localhost:3000/product/cart/clear, se llama a la función clearCart del controlador de productos para vaciar el carrito de compras.

module.exports = router; //Exportar el router para que pueda ser utilizado en app.js y así conectar estas rutas con el servidor.