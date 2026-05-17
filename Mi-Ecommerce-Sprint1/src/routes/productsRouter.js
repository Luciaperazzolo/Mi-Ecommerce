const router = express.Router();
const productsController = require('../controllers/productsController');

//  Catálogo con todos los productos juntos
router.get('/', productsController.catalogo);

//Filtra al tocar la barra oscura
// URL: localhost:3000/products/category/Alimentos
router.get('/category/:name', productsController.categoria);

//  Muestra un solo producto por su ID
//
// URL: localhost:3000/products/1
router.get('/:id', productsController.detalle);

module.exports = router;
