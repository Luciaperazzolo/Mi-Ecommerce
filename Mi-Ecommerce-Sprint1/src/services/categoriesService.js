const db = require("../db/database");

const categoriesService = {

    // Traer todas las categorías
    getAll: () => {
        return db.prepare("SELECT * FROM categories").all();
    },

    // Traer una categoría por ID
    getById: (id) => {
        return db.prepare("SELECT * FROM categories WHERE id = ?").get(id);
    },

    // Crear una categoría
    create: (categoryData) => {
        return db.prepare(
            "INSERT INTO categories (name) VALUES (?)"
        ).run(categoryData.name);
    },

    // Actualizar una categoría
    update: (id, categoryData) => {
        return db.prepare(
            "UPDATE categories SET name = ? WHERE id = ?"
        ).run(categoryData.name, id);
    },

    // Cuenta la cantidad total de categorías
    count() {
        const result = db.prepare("SELECT COUNT(*) AS total FROM categories").get();
        return result.total;
    },

    // Eliminar una categoría
    delete: (id) => {
        return db.prepare(
            "DELETE FROM categories WHERE id = ?"
        ).run(id);
    }

};

module.exports = categoriesService;