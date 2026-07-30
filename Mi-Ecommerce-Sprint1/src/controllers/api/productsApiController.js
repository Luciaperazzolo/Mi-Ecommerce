const productsService = require('../../services/productsService');

const productsApiController = {

    // GET /api/products
    getAll(req, res) {
        try {
            const { sort, category } = req.query;
            let products;

            if (category) {
                // Filtra por categoría si viene en la query
                products = productsService.getByCategory(category);
            } else {
                // Si no hay categoría, trae todos los productos (con orden opcional)
                products = productsService.getAll(sort);
            }

            return res.status(200).json(products);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // GET /api/products/:id
    getById(req, res) {
        const validacion = productsService.normalizeId(req.params.id);

        if (validacion.error === 400) {
            return res.status(400).json({ error: "Bad Request" });
        }
        if (validacion.error === 404) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const product = productsService.getById(validacion.validId);
        return res.status(200).json(product);
    },

    // POST /api/products
    create(req, res) {
        try {
            const result = productsService.create(req.body);
            return res.status(201).json({
                message: "Producto creado correctamente",
                id: result.lastInsertRowid
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // PUT /api/products/:id
    update(req, res) {
        const validacion = productsService.normalizeId(req.params.id);

        if (validacion.error === 400) {
            return res.status(400).json({ error: "Bad Request" });
        }
        if (validacion.error === 404) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        try {
            productsService.update(validacion.validId, req.body);
            return res.status(200).json({ message: "Producto actualizado correctamente" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // DELETE /api/products/:id
    delete(req, res) {
        const validacion = productsService.normalizeId(req.params.id);

        if (validacion.error === 400) {
            return res.status(400).json({ error: "Bad Request" });
        }
        if (validacion.error === 404) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        try {
            productsService.delete(validacion.validId);
            return res.status(200).json({ message: "Producto eliminado correctamente" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

module.exports = productsApiController;
