const productModel = require('../models/productModel'); // Verificá que esta ruta a tu modelo sea correcta

const productsController = {

    detalle: (req, res) => {
        const id = req.params.id;
        const allProducts = productModel.findAll();
        const product = productModel.findById(id);

        if (product) {
            // 1. Filtramos: que no sea el mismo Y que sea de la misma categoría
            let related = allProducts.filter(p => p.id != product.id && p.category == product.category);
            
            // 2. Mezclamos el array para el azar
            related.sort(() => Math.random() - 0.5);
            
            // 3. Cortamos para que solo pasen 4 a la vista
            const relatedProducts = related.slice(0, 4);

            res.render('products', { product, relatedProducts });
        } else {
            // 4. Si el ID no existe (ej: 999), muestra este mensaje
            res.send("<h1>Producto no disponible</h1><a href='/'>Volver al inicio</a>");
        }
    }
};

module.exports = productsController;
