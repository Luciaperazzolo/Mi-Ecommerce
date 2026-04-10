//--- IMPORTACIÓN DE MÓDULOS ---
const express = require ('express'); //Traigo la Heramienta
const app = express (); //La pongo en función

//--- CONFIGURACIÓN DEL SERVIDOR ---
app.set ('view engine', 'ejs');
app.use(express.static('assets'));

//--- DEFINICIÓN DE RUTAS (USER STORY #2) ---
index.get ('/', (req, res) => {res.render("pages/index");
});

//Acá abajo deberiamos definir las rutas que faltan.

//--- PUESTA EN MARCHA ---
const port = 3000; //Encender el servidor
index.listen (port, () => {
    console.log('Aplicación funcionando en el puerto ${port}!'); //Mensaje en terminal "Ya estoy Funcinando"
});

