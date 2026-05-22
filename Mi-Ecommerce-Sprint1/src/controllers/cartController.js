const productsService = require('../services/productsService');
const cartService = require('../services/cartService');

// VER CARRITO
exports.index = (req, res) => {
    const cartSession = cartService.getCart(req);

    const detailedCart = cartSession.map(item => {
        const productDetail = productsService.getById(item.productId);
        if (!productDetail) return null;
        return {
            id: productDetail.id,
            name: productDetail.name,
            price: productDetail.price,
            image: `/Imagenes-productos/${productDetail.image}`,
            quantity: item.quantity,
            subtotal: productDetail.price * item.quantity
        };
    }).filter(item => item !== null);

    const total = cartService.calculateTotal(req);

    res.render('pages/cart', { cart: detailedCart, total });
};

// VER EL CHECKOUT
exports.getCheckout = (req, res) => {
    const cartSession = cartService.getCart(req);
    const detailedCart = cartSession.map(item => {
        const product = productsService.getById(item.productId);
        return { ...product, quantity: item.quantity, subtotal: product.price * item.quantity };
    });
    const total = cartService.calculateTotal(req);

    res.render('pages/checkout', { cart: detailedCart, total });
};

// AGREGAR PRODUCTO AL CARRITO (VALIDANDO STOCK)
exports.addToCart = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = productsService.getById(productId);
    if (!product) return res.redirect('/');

    const stockDisponible = product.stock !== undefined ? product.stock : 5;
    const cart = cartService.getCart(req);
    const item = cart.find(i => i.productId == productId);
    const cantidadActual = item ? item.quantity : 0;

    if (cantidadActual + 1 > stockDisponible) {
        return res.redirect(`/products/detail/${productId}?error=No hay suficiente stock disponible`);
    }

    cartService.addProduct(req, productId, 1);
    res.redirect('/cart');
};

// ACTUALIZAR CANTIDAD
exports.updateQuantity = (req, res) => {
    const { id, action } = req.params;
    const productId = parseInt(id);

    const ok = cartService.updateQuantity(req, productId, action);
    if (!ok) return res.redirect('/cart?error=Maximo stock alcanzado');

    res.redirect('/cart');
};

// VACIAR CARRITO
exports.clearCart = (req, res) => {
    cartService.clearCart(req);
    res.redirect('/cart');
};
