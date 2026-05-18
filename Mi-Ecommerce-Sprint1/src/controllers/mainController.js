const productModel = require("../models/productModel");

const mainController = {
    index: (req, res) => {
        const products = productModel.findAll();

        // 4 productos sugeridos (aleatorios)
        const suggestedProducts = products
            .sort(() => Math.random() - 0.4)
            .slice(0, 4);

        // 10 productos más pedidos (flag o aleatorios)
        const popularProducts = products.filter(p => p.isPopular).slice(0, 8);

        // Si no hay flag en el JSON, se eligen 10 aleatorios
        const finalPopular = popularProducts.length > 0 
            ? popularProducts 
            : products.sort(() => Math.random() - 0.4).slice(0, 8);

        res.render("pages/index", {
            suggestedProducts,
            popularProducts: finalPopular
        });
    }
};

module.exports = mainController;
