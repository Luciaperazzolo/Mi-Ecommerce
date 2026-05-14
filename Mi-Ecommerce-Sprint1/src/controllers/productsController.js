const productModel = require('../models/productModel'); 

const productsController = {
    detalle: (req, res) => {
        const id = req.params.id;
        const allProducts = productModel.findAll();
        const product = productModel.findById(id);

        if (product) {
            let related = allProducts.filter(p => p.id != product.id && p.category == product.category);
            related.sort(() => Math.random() - 0.5);
            const relatedProducts = related.slice(0, 4);

            res.render('pages/products', { product, relatedProducts });
        } else {
            res.status(404).render('pages/404');
        }
    },

    // MÉTODO PARA FILTRAR POR CATEGORÍA
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
