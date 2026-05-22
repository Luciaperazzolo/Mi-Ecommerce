const productsService = require('../services/productsService');

const cartService = {
    getCart: (req) => req.session.cart || [],

    addProduct: (req, productId, quantity = 1) => {
        const cart = req.session.cart || [];
        const itemIndex = cart.findIndex(i => i.productId === productId);

        if (itemIndex > -1) {
            cart[itemIndex].quantity += quantity;
        } else {
            cart.push({ productId, quantity });
        }
        req.session.cart = cart;
    },

    updateQuantity: (req, productId, action) => {
        const cart = req.session.cart || [];
        const item = cart.find(i => i.productId == productId);

        if (item) {
            if (action === 'increase') {
                const product = productsService.getById(productId);
                const stockDisponible = product && product.stock !== undefined ? product.stock : 5;
                if (item.quantity + 1 > stockDisponible) return false;
                item.quantity++;
            } else if (action === 'decrease') {
                item.quantity--;
            }
            if (item.quantity <= 0) {
                req.session.cart = cart.filter(i => i.productId != productId);
            } else {
                req.session.cart = cart;
            }
        }
        return true;
    },

    clearCart: (req) => {
        req.session.cart = [];
    },

    calculateTotal: (req) => {
        const cart = req.session.cart || [];
        return cart.reduce((acc, item) => {
            const product = productsService.getById(item.productId);
            return acc + (product ? product.price * item.quantity : 0);
        }, 0);
    }
};

module.exports = cartService;
