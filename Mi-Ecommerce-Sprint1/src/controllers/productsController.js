const productsService = require('../services/productsService');

const productsController = {
    // Muestra todos los productos juntos (soporta ordenamiento por precio ?sort=asc o ?sort=desc)
    catalogo: (req, res) => {
        const sortOrder = req.query.sort; 
        
        // Le pasamos el parámetro al servicio para que nos traiga la lista ordenada
        const todosLosProductos = productsService.getAll(sortOrder);
        
        res.render('pages/products', { 
            products: todosLosProductos 
        });
    },

    // Muestra el detalle de un solo producto por su ID
    detalle: (req, res) => {
        const validacion = productsService.normalizeId(req.params.id);

  
        if (validacion.error === 400) {
            return res.status(400).render('pages/404');
        }

     
        if (validacion.error === 404) {
            return res.status(404).render('pages/404'); 
        }

        // Si pasó las barreras, buscamos el producto real
        const producto = productsService.getById(validacion.validId);
        
        
        const relacionados = productsService.getRelated(producto);
        
        res.render('pages/productDetail', { 
            product: producto,
            relatedProducts: relacionados 
        });
    },
    
    
    categoria: (req, res) => {
        const nombreCategoria = req.params.name; 
        const filtrados = productsService.getByCategory(nombreCategoria);

        res.render('pages/productsCategory', { 
            products: filtrados, 
            categoryName: nombreCategoria 
        });
    },

    // Procesa la búsqueda por nombre del buscador del Header
    buscar: (req, res) => {
        const palabraBuscada = req.query.query; 
        const resultados = productsService.searchByName(palabraBuscada);

        res.render('pages/products', { 
            products: resultados, 
            searchQuery: palabraBuscada 
        });
    },

    crearForm: (req, res) => {
        res.render('pages/productCreate'); 
    },
    guardar: (req, res) => {
        productsService.create(req.body);
        res.redirect('/products');
    },

    // Muestra el formulario para editar un producto existente
    editarForm: (req, res) => {
        const validacion = productsService.normalizeId(req.params.id);

        if (validacion.error === 400) {
            return res.status(400).render('pages/404');
        }

        if (validacion.error === 404) {
            return res.status(404).render('pages/404');
        }

        const product = productsService.getById(validacion.validId);
        res.render('pages/productEdit', { product });
    },

    // Recibe los datos editados y actualiza SQLite
    actualizar: (req, res) => {
        const validacion = productsService.normalizeId(req.params.id);

        if (validacion.error === 400) {
            return res.status(400).render('pages/404');
        }

        if (validacion.error === 404) {
            return res.status(404).render('pages/404');
        }

        // Le pasa al servicio el ID validado y los nuevos datos (req.body)
        productsService.update(validacion.validId, req.body);
        
        // Redirecciona al detalle del producto modificado para ver los cambios
        res.redirect(`/products/${validacion.validId}`);
    },

    // Elimina un producto de la base de datos
    borrar: (req, res) => {
        const validacion = productsService.normalizeId(req.params.id);

        if (validacion.error === 400) {
            return res.status(400).render('pages/404');
        }

        if (validacion.error === 404) {
            return res.status(404).render('pages/404');
        }
       
        productsService.delete(validacion.validId);
        res.redirect('/products');
    }
};

module.exports = productsController;