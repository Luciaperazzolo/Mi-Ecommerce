const path = require('path');
const Database = require('better-sqlite3');

// Conectamos con la base de datos
const db = new Database(path.join(__dirname, '../db/ecommerce.db'));

const productsService = {
    //  Normalizar ID
    normalizeId: (id) => {
        const parsed = Number(id);
        if (isNaN(parsed) || parsed <= 0) {
            return null;
        }
        return parsed;
    },

    // Traer todos los productos (con o sin orden)
    getAll: (sortOrder) => {
        let query = 'SELECT * FROM products';
        if (sortOrder === 'asc') {
            query += ' ORDER BY price ASC';
        } else if (sortOrder === 'desc') {
            query += ' ORDER BY price DESC';
        }
        return db.prepare(query).all();
    },

    //  Buscador del Header
    searchByName: (query) => {
        if (!query) {
            return db.prepare('SELECT * FROM products').all();
        }
        return db.prepare('SELECT * FROM products WHERE name LIKE ?').all(`%${query}%`);
    },

    // Detalle de un producto por ID
    getById: (id) => {
        return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    },

    // Filtra por Categoría
    getByCategory: (categoryName) => {
        return db.prepare('SELECT * FROM products WHERE LOWER(category) = LOWER(?)').all(categoryName);
    },

    // Productos Relacionados
    getRelated: (product) => {
        return db.prepare(
            'SELECT * FROM products WHERE id != ? AND category = ? ORDER BY RANDOM() LIMIT 4'
        ).all(product.id, product.category);
    },

    // Detalle del Carrito
    getDetailedCart: (cartSession) => {
        return cartSession.map(item => {
            const productDetail = db.prepare('SELECT * FROM products WHERE id = ?').get(item.productId);
            if (!productDetail) return null;
            return {
                id: productDetail.id,
                name: productDetail.name,
                price: productDetail.price,
                image: `/Imagenes-productos/${productDetail.image}`,
                quantity: item.quantity,
                subtotal: productDetail.price * item.quantity
            };
        }).filter(item => item !== null);
    },


    //  crea un    nuevo producto
    create: (productData) => {
        const query = `
            INSERT INTO products (name, description, price, image, category, stock)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        return db.prepare(query).run(
            productData.name,
            productData.description,
            productData.price,
            productData.image,
            productData.category,
            productData.stock || 0
        );
    },

    // EDITA un producto existente
    update: (id, productData) => {
        const query = `
            UPDATE products 
            SET name = ?, description = ?, price = ?, image = ?, category = ?, stock = ?
            WHERE id = ?
        `;
        return db.prepare(query).run(
            productData.name,
            productData.description,
            productData.price,
            productData.image,
            productData.category,
            productData.stock || 0,
            id
        );
    },

    // borra un producto
    delete: (id) => {
        return db.prepare('DELETE FROM products WHERE id = ?').run(id);
    }
};

module.exports = productsService;