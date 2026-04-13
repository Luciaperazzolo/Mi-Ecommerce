//--- IMPORTACIÓN DE MÓDULOS ---
const express = require ('express'); //Traigo la Heramienta
const app = express (); //La pongo en función

//--- CONFIGURACIÓN DEL SERVIDOR ---
app.set ('view engine', 'ejs');
app.use(express.static(__dirname +'/assets'));

//--- DEFINICIÓN DE RUTAS (USER STORY #2) ---
app.get ('/index', (req, res) => {res.render("pages/index");
});

app.get ('/cart', (req, res) => {res.render ('pages/cart');
});
app.get('/product', (req, res) => {
    res.render("pages/product");
});


//Acá abajo deberiamos definir las rutas que faltan.

//--- PUESTA EN MARCHA ---
app.listen(3000, () => { //Encender servidor
    console.log("Servidor corriendo en http://localhost:3000"); //mje en terminal: "Servidor funcionando en: http://localhost:3000"
});

