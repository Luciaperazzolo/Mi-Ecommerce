const fs = require('fs');
const path = require('path');

const productModel = {
    // 1. Buscamos la ruta del archivo JSON
  
    jsonPath: path.join(__dirname, '../../data/products.json'),

    // 2. Función para leer todos los productos
    findAll: function() {
        const jsonContent = fs.readFileSync(this.jsonPath, 'utf-8');
        return JSON.parse(jsonContent);
    },

    // 3. Función para buscar un producto por su ID
    findById: function(id) {
        const allProducts = this.findAll();
        const productFound = allProducts.find(p => p.id == id);
        return productFound;
    }
};

module.exports = productModel;
