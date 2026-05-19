const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

// PÁGINA PRINCIPAL
router.get("/", mainController.index);

// PÁGINA DE LOGIN - Sprint 1 US4
router.get("/login", mainController.login);

// PÁGINA DE REGISTRO - Sprint 1 US3
router.get("/register", mainController.register);

module.exports = router;
