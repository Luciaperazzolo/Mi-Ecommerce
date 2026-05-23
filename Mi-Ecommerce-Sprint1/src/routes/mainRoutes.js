const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");
const authController = require("../controllers/authController");

// PÁGINA PRINCIPAL
router.get("/", mainController.index);

// PÁGINA DE LOGIN - Sprint 1 US4
router.get("/login", (req, res) => {
    res.render("pages/login", { layout: false, error: null, query: req.query });
});

// PÁGINA DE REGISTRO - Sprint 1 US3
router.get("/register", (req, res) => {
    res.render("pages/register", { layout: false, error: null });
});

// POST REGISTRO - Sprint 2 US3
router.post("/register", authController.postRegister);

// POST LOGIN - Sprint 2 US4
router.post("/login", authController.postLogin);

// LOGOUT
router.get("/logout", authController.logout);

module.exports = router;
