const mainController = {

    index: (req, res) => {
        res.render("pages/index");
    },

    product: (req, res) => {
        res.render("pages/product");
    },
};

module.exports = mainController;