const categoriesService = require("../../services/categoriesService");

const categoriesApiController = {

    // GET /api/categories
    getAll(req, res) {

        const categories = categoriesService.getAll();

        return res.status(200).json(categories);

    },

    // GET /api/categories/:id
    getById(req, res) {

        const category = categoriesService.getById(req.params.id);

        if (!category) {
            return res.status(404).json({
                error: "Categoría no encontrada"
            });
        }

        return res.status(200).json(category);

    },

    // POST /api/categories
    create(req, res) {

        try {

            const result = categoriesService.create(req.body);

            return res.status(201).json({
                message: "Categoría creada correctamente",
                id: result.lastInsertRowid
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: "Internal Server Error"
            });

        }

    },

    // PUT /api/categories/:id
    update(req, res) {

        const category = categoriesService.getById(req.params.id);

        if (!category) {
            return res.status(404).json({
                error: "Categoría no encontrada"
            });
        }

        try {

            categoriesService.update(req.params.id, req.body);

            return res.status(200).json({
                message: "Categoría actualizada correctamente"
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: "Internal Server Error"
            });

        }

    },

    // DELETE /api/categories/:id
    delete(req, res) {

        const category = categoriesService.getById(req.params.id);

        if (!category) {
            return res.status(404).json({
                error: "Categoría no encontrada"
            });
        }

        try {

            categoriesService.delete(req.params.id);

            return res.status(200).json({
                message: "Categoría eliminada correctamente"
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: "Internal Server Error"
            });

        }

    }

};

module.exports = categoriesApiController;