const db = require('../db/database');

const productsService = {
    
   // Normalizar y validar ID contra la base de datos
    normalizeId: (id) => {
        const parsed = Number(id);
        
        // Valida que el ID sea numérico y valido
        if (isNaN(parsed) || parsed <= 0) {
            return { error: 400, message: 'Bad Request' };
        }
        
        // Valida que el producto exista en la base de datos
        const productExists = db.prepare('SELECT id FROM products WHERE id = ?').get(parsed);
        
        if (!productExists) {
            return { error: 404, message: 'Not Found' };
        }
        
        return { validId: parsed };
    },

    // Traer todos los productos
    getAll: (sortOrder) => {
        let query = 'SELECT * FROM products';
        
        switch (sortOrder) {
            case 'asc':
                query += ' ORDER BY price ASC';
                break;
            case 'desc':
                query += ' ORDER BY price DESC';
                break;
        }
        
        return db.prepare(query).all();
    },

    // Buscador del Header
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


    getByCategory: (categoryName) => {
        return db.prepare('SELECT * FROM products WHERE LOWER(category) = LOWER(?)').all(categoryName);
    },

  
    getRelated: (product) => {
        return db.prepare(
            'SELECT * FROM products WHERE id != ? AND category = ? ORDER BY RANDOM() LIMIT 4'
        ).all(product.id, product.category);
    },

  
    getSuggested: () => {
        return db.prepare('SELECT * FROM products ORDER BY RANDOM() LIMIT 4').all();
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

    // Crea un nuevo producto
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

    // Borra un producto
    delete: (id) => {
        return db.prepare('DELETE FROM products WHERE id = ?').run(id);
    }
};

module.exports = productsService;