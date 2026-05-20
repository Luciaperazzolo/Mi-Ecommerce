const productsService = require('../services/productsService');
const cartService = require('../services/cartService'); 

const productsController = {
    //  Muestra todos los productos juntos (soporta ordenamiento por precio ?sort=asc o ?sort=desc)
    catalogo: (req, res) => {
        const sortOrder = req.query.sort; // Captura el parámetro de ordenamiento de la URL
        
        // Le pasamos el parámetro al servicio para que nos traiga la lista ordenada
        const todosLosProductos = productsService.getAll(sortOrder);
        
        res.render('pages/products', { 
            products: todosLosProductos 
        });
    },

    //  Muestra un solo producto por su ID y sus relacionados
    detalle: (req, res) => {
        const idParam = req.params.id;
        
        // Validamos y normalizamos el ID usando el servicio
        const cleanId = productsService.normalizeId(idParam);

        if (cleanId === null) {
            return res.status(400).send('Bad Request: El ID de producto debe ser un número válido.');
        }

        // Si el ID es válido, buscamos el producto 
        const product = productsService.getById(cleanId);

        if (product) {
            //  filtrar y mezclar los relacionados
            const relatedProducts = productsService.getRelated(product);
            res.render('pages/productDetail', { product, relatedProducts });
        } else {
            res.status(404).render('pages/404');
        }
    },

    // Filtra por sección 
    categoria: (req, res) => {
        const nombreCategoria = req.params.name; 
    
        const filtrados = productsService.getByCategory(nombreCategoria);

        res.render('pages/productsCategory', { 
            products: filtrados, 
            categoryName: nombreCategoria 
        });
    },

    //  Muestra el formulario de confirmación de pedido
    confirm: (req, res) => {
        const { nombre, direccion, metodoPago } = req.body;
        const cartSession = req.session.cart || [];
        
        //  se encarga de armar el carrito detallado con datos reales
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

    // Procesa la búsqueda por nombre 
    buscar: (req, res) => {
        const palabraBuscada = req.query.query; 
        const resultados = productsService.searchByName(palabraBuscada);

    
        res.render('pages/products', { 
            products: resultados, 
            searchQuery: palabraBuscada 
        });
    },

    // Muestra el formulario para crear un producto nuevo
    crearForm: (req, res) => {
    
        // (Fijate si con las chicas le pusieron este nombre al archivo .ejs de creación)
        res.render('pages/productCreate'); 
    },

    // Recibe los datos del formulario de creación y los guarda en SQLite
    guardar: (req, res) => {
    
        productsService.create(req.body);
        
        // Redirecciona al catálogo para ver el producto nuevo agregado al final
        res.redirect('/products');
    },

    //  Muestra el formulario para editar un producto existente
    editarForm: (req, res) => {
        const cleanId = productsService.normalizeId(req.params.id);
        if (cleanId === null) {
            return res.status(400).send('ID inválido.');
        }

        const product = productsService.getById(cleanId);
        if (!product) {
            return res.status(404).render('pages/404');
        }

        // Le pasa el producto encontrado al formulario para que los inputs ya aparezcan llenos
        // (Fijate si con las chicas le pusieron este nombre al archivo .ejs de edición)
        res.render('pages/productEdit', { product });
    },

    // Recibe los datos editados y actualiza SQLite
    actualizar: (req, res) => {
        const cleanId = productsService.normalizeId(req.params.id);
        if (cleanId === null) {
            return res.status(400).send('ID inválido.');
        }

        // Le pasa al servicio el ID y los nuevos datos del formulario (req.body)
        productsService.update(cleanId, req.body);
        
        // Redirecciona al detalle del producto modificado para ver los cambios
        res.redirect(`/products/${cleanId}`);
    },

    //  Elimina un producto de la base de datos
    borrar: (req, res) => {
        const cleanId = productsService.normalizeId(req.params.id);
        if (cleanId === null) {
            return res.status(400).send('ID inválido.');
        }

       
        productsService.delete(cleanId);
        
        // Redirecciona al catálogo principal
        res.redirect('/products');
    }
};

module.exports = productsController;