const mainController = {

    index: (req, res) => {
        res.render("pages/index");
    },

    cart: (req, res) => {
        res.render("pages/cart");
    },

    product: (req, res) => {
        res.render("pages/product");
    },

    checkout: (req, res) => {
        res.render("pages/checkout");
    }

};

module.exports = mainController;