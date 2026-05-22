const productsService = require('../services/productsService');
const cartService = require('../services/cartService');

// CONFIRMAR COMPRA
exports.confirmPurchase = (req, res) => {
    const { nombre, direccion, metodoPago } = req.body;
    const cart = cartService.getCart(req);
    const total = cartService.calculateTotal(req);

    const detailedCart = productsService.getDetailedCart(cart);
    
    //Vaciar carrito y guardar sesión ANTES de renderizar
    cartService.clearCart(req);

    req.session.save(() => {
        res.render('pages/confirm', {
            nombre,
            direccion,
            metodoPago,
            cart: detailedCart,
            total
        });
    });
};
