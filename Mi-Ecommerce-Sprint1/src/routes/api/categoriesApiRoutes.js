const express = require("express");
const router = express.Router();

const categoriesApiController = require("../../controllers/api/categoriesApiController");

// GET - Todas las categorías
router.get("/", categoriesApiController.getAll);

// GET - Una categoría por ID
router.get("/:id", categoriesApiController.getById);

// POST - Crear categoría
router.post("/", categoriesApiController.create);

// PUT - Actualizar categoría
router.put("/:id", categoriesApiController.update);

// DELETE - Eliminar categoría
router.delete("/:id", categoriesApiController.delete);

module.exports = router;