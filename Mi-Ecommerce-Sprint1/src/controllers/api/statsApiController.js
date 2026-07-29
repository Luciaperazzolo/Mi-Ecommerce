const productsService = require("../../services/productsService");
const categoriesService = require("../../services/categoriesService");

const statsApiController = {

    getStats(req, res) {

        const totalProducts = productsService.count();
        const totalCategories = categoriesService.count();

        return res.status(200).json({
            totalProducts,
            totalCategories
        });

    }

};

module.exports = statsApiController;