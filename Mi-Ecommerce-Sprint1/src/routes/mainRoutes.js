const express = require("express"); //Importamos Express para usar rutas
const router = express.Router(); //Creamos router, manejador de rutas

const mainController = require("../controllers/mainController"); //Traemos controller, importa el archivo

router.get("/", mainController.index);  //ejecuta: mainController.index
router.get("/product", mainController.product);

module.exports = router; //Exportamos rutas para usarlo en app.js