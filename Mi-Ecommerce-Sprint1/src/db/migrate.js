const db = require('./database'); // Importamos la conexión a la base de datos
const fs = require('fs');
const path = require('path');

function migrarProductos() {
    //  Buscama l archivo products.json 
   
    const jsonPath = path.join(__dirname, '../../data/products.json'); 
    
    if (!fs.existsSync(jsonPath)) {
        console.log("⚠️ No se encontró el archivo products.json. Chequeá si la ruta en jsonPath es la correcta.");
        return;
    }

    // Leer los datos del JSON
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const productosJSON = JSON.parse(rawData);

    console.log(`🚀 Migrando ${productosJSON.length} productos a la base de datos SQLite...`);

    //Preparamos la sentencia SQL 
    const insertStatement = db.prepare(`
        INSERT OR IGNORE INTO products (id, name, price, image, category, stock)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    // Ejecutamos la migración 
    const transaccion = db.transaction((productos) => {
        for (const p of productos) {
            insertStatement.run(
                p.id,
                p.name,
                p.price,
                p.image,
                p.category,
                p.stock || 0 // Si algún producto no tenía stock, le pone 0 por defecto
            );
        }
    });

    // Corremos la transacción
    transaccion(productosJSON);

    console.log("Migración exitosa.")
}

migrarProductos();