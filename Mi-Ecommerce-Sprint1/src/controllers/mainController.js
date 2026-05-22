const productsService = require('../services/productsService');

const mainController = {

    // PÁGINA PRINCIPAL
    index: (req, res) => {
        const productos = productsService.getAll();

        // 4 productos sugeridos (aleatorios)
        const suggestedProducts = productos
            .sort(() => Math.random() - 0.4)
            .slice(0, 4);

        // Productos más pedidos (flag isPopular o aleatorios)
        const popularProducts = productos.filter(p => p.isPopular).slice(0, 8);
        const finalPopular = popularProducts.length > 0
            ? popularProducts
            : productos.sort(() => Math.random() - 0.4).slice(0, 8);

        res.render("pages/index", {
            suggestedProducts,
            popularProducts: finalPopular
        });
    },

    // PÁGINA DE LOGIN - Sprint 1 US4
    login: (req, res) => {
        res.render("pages/login");
    },

    // PÁGINA DE REGISTRO - Sprint 1 US3
    register: (req, res) => {
        res.render("pages/register");
    }
};

module.exports = mainController;
