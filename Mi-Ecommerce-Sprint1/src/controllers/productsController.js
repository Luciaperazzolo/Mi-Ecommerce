const productModel = require('../models/productModel'); 

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
    }
};

module.exports = productsController;
