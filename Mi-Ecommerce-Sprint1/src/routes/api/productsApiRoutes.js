const express = require("express");
const router = express.Router();

const productsApiController = require("../../controllers/api/productsApiController");

router.get("/", productsApiController.getAll);
router.get("/:id", productsApiController.getById);
router.post("/", productsApiController.create);
router.put("/:id", productsApiController.update);
router.delete("/:id", productsApiController.delete);

module.exports = router;