const productModel = require('../models/productModel'); 
const cartService = require('../services/cartService');

const productsController = {
    //  Muestra  todos los productos juntos '
    catalogo: (req, res) => {
    const todosLosProductos = productModel.findAll();
    res.render('pages/products', { 
        products: todosLosProductos 
    });
},


    //  Muestra un solo producto por su ID)
    detalle: (req, res) => {
        const id = req.params.id;
        const allProducts = productModel.findAll();
        const product = productModel.findById(id);

        if (product) {
            let related = allProducts.filter(p => p.id != product.id && p.category == product.category);
            related.sort(() => Math.random() - 0.5);
            const relatedProducts = related.slice(0, 4);

            res.render('pages/productDetail', { product, relatedProducts });
        } else {
            res.status(404).render('pages/404');
        }
    },

    // Filtra por sección (Alimentos, Bebidas)
    categoria: (req, res) => {
        const nombreCategoria = req.params.name; 
        const todosLosProductos = productModel.findAll();

        const filtrados = todosLosProductos.filter(p => 
            p.category.toLowerCase() === nombreCategoria.toLowerCase()
        );

        res.render('pages/productsCategory', { 
            products: filtrados, 
            categoryName: nombreCategoria 
        });
    },

    //Muestra el formulario de confirmación de pedido.
    confirm: (req, res) => {
    const { nombre, direccion, metodoPago } = req.body;
    const cartSession = req.session.cart || [];
    
    //Armamos el carrito detallado con datos reales
    const detailedCart = cartSession.map(item => {
        const productDetail = productModel.findById(item.productId);
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

    const total = detailedCart.reduce((acc, item) => acc + item.subtotal, 0);

    res.render('pages/confirm', {
        nombre,
        direccion,
        metodoPago,
        cart: detailedCart,
        total
    });
    }
}

module.exports = productsController;
