const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Definimos dónde se va a guardar el archivo físico de la base de datos
const dbPath = path.join(__dirname, 'ecommerce.db');

// Creamos la base de datos
const db = new Database(dbPath, { verbose: console.log });

//  archivo eschema.sql para inicializar las tablas automáticamente
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);

// Exportamos la conexión para usarla en los servicios 
module.exports = db;