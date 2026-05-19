const productModel = require('../models/productModel');

const productsService = {
    // Valida y normaliza el ID
    normalizeId: (id) => {
        const parsed = Number(id);
        // Si no es un número válido (NaN) o es menor o igual a cero, devuelve null
        if (isNaN(parsed) || parsed <= 0) {
            return null;
        }
        return parsed;
    },

    // Retorna todos los productos (y soporta ordenamiento por precio)
    getAll: (sortOrder) => {
        const todos = productModel.findAll();
        
        // Clonamos el array con el operador spread, para no alterar el orden del JSON original en memoria
        let sortedProducts = [...todos]; 

        if (sortOrder === 'asc') {
            // Ordena de menor a mayor precio
            return sortedProducts.sort((a, b) => a.price - b.price);
        } 
        
        if (sortOrder === 'desc') {
            // Ordena de mayor a menor precio
            return sortedProducts.sort((a, b) => b.price - a.price);
        }
        
        // Si no viene parámetro de orden, devuelve la lista original
        return sortedProducts;
    },

    //  Busca productos por nombre 
    searchByName: (query) => {
        const todos = productModel.findAll();
        
        if (!query) return todos; // Si mandan el buscador vacío, devuelve todo el catálogo

        // Filtra buscando si el nombre incluye la palabra tipeada por el usuario
        return todos.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase())
        );
    },

    // Ahora recibe el ID ya normalizado
    getById: (id) => {
        const todos = productModel.findAll();
        return todos.find(p => p.id === id);
    },

    // Se lleva la lógica de filtrado por categoría
    getByCategory: (categoryName) => {
        const todos = productModel.findAll();
        return todos.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
    },

    // Se lleva la lógica de buscar y mezclar los productos relacionados
    getRelated: (product) => {
        const allProducts = productModel.findAll();
        let related = allProducts.filter(p => p.id != product.id && p.category == product.category);
        
        // Mezcla aleatoria
        related.sort(() => Math.random() - 0.5);
        
        // Retorna solo los primeros 4
        return related.slice(0, 4);
    },

    // Se lleva la lógica de armar el carrito detallado para la confirmación
    getDetailedCart: (cartSession) => {
        return cartSession.map(item => {
            const productDetail = productModel.findById(item.productId);
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
    }
};

module.exports = productsService;