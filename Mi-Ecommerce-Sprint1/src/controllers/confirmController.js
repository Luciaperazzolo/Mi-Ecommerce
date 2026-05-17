// CONFIRMAR COMPRA
exports.confirmPurchase = (req, res) => {
    const { nombre, direccion, metodoPago } = req.body;
    const cart = cartService.getCart(req);
    const total = cartService.calculateTotal(req);

    const detailedCart = cart.map(item => {
        const productDetail = productModel.findById(item.productId);
        return {
            id: productDetail.id,
            name: productDetail.name,
            price: productDetail.price,
            image: `/Imagenes-productos/${productDetail.image}`,
            quantity: item.quantity,
            subtotal: productDetail.price * item.quantity
        };
    });

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
