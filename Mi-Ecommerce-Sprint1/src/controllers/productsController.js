const productsService = require('../services/productsService');
const cartService = require('../services/cartService'); // Lo dejamos por si lo usan en el carrito

const productsController = {
    // Muestra todos los productos juntos (soporta ordenamiento por precio ?sort=asc o ?sort=desc)
    catalogo: (req, res) => {
        const sortOrder = req.query.sort; // Captura el parámetro de ordenamiento de la URL
        
        // Le pasamos el parámetro al servicio para que nos traiga la lista ordenada
        const todosLosProductos = productsService.getAll(sortOrder);
        
        res.render('pages/products', { 
            products: todosLosProductos 
        });
    },

    // Muestra un solo producto por su ID y sus relacionados
    detalle: (req, res) => {
        const idParam = req.params.id;
        
        // Validamos y normalizamos el ID usando el servicio
        const cleanId = productsService.normalizeId(idParam);

        // ID no numérico (letras/raro) -> Retorna status 400
        if (cleanId === null) {
            return res.status(400).send('Bad Request: El ID de producto debe ser un número válido.');
        }

        // Si el ID es válido, buscamos el producto real
        const product = productsService.getById(cleanId);

        // ID numérico pero inexistente -> Retorna status 404
        if (product) {
            // El servicio se encarga de filtrar y mezclar los relacionados
            const relatedProducts = productsService.getRelated(product);
            res.render('pages/productDetail', { product, relatedProducts });
        } else {
            res.status(404).render('pages/404');
        }
    },

    // Filtra por sección (Alimentos, Bebidas)
    categoria: (req, res) => {
        const nombreCategoria = req.params.name; 
        // El servicio se encarga del filtrado puro
        const filtrados = productsService.getByCategory(nombreCategoria);

        res.render('pages/productsCategory', { 
            products: filtrados, 
            categoryName: nombreCategoria 
        });
    },

    // Muestra el formulario de confirmación de pedido
    confirm: (req, res) => {
        const { nombre, direccion, metodoPago } = req.body;
        const cartSession = req.session.cart || [];
        
        // El servicio se encarga de armar el carrito detallado con datos reales
        const detailedCart = productsService.getDetailedCart(cartSession);
        const total = detailedCart.reduce((acc, item) => acc + item.subtotal, 0);

        res.render('pages/confirm', {
            nombre,
            direccion,
            metodoPago,
            cart: detailedCart,
            total
        });
    },

    //  Procesa la búsqueda por nombre desde el  header
    buscar: (req, res) => {
        const palabraBuscada = req.query.query; // Captura lo que el usuario escribe en el input
        const resultados = productsService.searchByName(palabraBuscada);

        // Manda los productos filtrados a la misma vista de catálogo de siempre
        res.render('pages/products', { 
            products: resultados, 
            searchQuery: palabraBuscada // Se lo enviamos por si quieren usarlo en la vista
        });
    }
};

module.exports = productsController;