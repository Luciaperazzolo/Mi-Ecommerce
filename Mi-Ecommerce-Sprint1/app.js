//--- IMPORTACIÓN DE MÓDULOS ---
const express = require ('express'); //Traigo la Heramienta
const session = require('express-session'); //Herramienta para usar sesiones
const productRoutes = require('./routes/productRoute'); //Importar las rutas relacionadas con productos.
const app = express (); //La pongo en función

//--- CONFIGURACIÓN DEL SERVIDOR ---
app.set ('view engine', 'ejs'); //Configuro el motor de plantillas para que use EJS, lo que me permite generar HTML dinámico a partir de mis vistas.
app.use(express.static(__dirname +'/assets')); //Configuro la carpeta de archivos estáticos, lo que me permite servir CSS, imágenes y otros recursos directamente desde esa carpeta sin necesidad de rutas específicas para cada uno.

//--- ACTIVO LA HERRAMIENTA DE SESIONES ---
app.use(session({ //Activando el sistema de sesiones.
    secret: 'claveUltraSecreta_carrito', //Contraseña interna que usa el servidor para firmar la sesión y evitar que la manipulen.
    resave: false, //No guarda la sesión si no cambio algo de página en página.
    saveUninitialized: false //Evita que se guarden sesiones vacias.
}));

//--- DEFINICIÓN DE RUTAS (USER STORY #2) ---
app.get('/', (req, res) => {
    res.render('pages/index');
});

app.use('/product', productRoutes); //Usar las rutas relacionadas con productos cuando el usuario acceda a /product

//--- PUESTA EN MARCHA ---
app.listen(3000, () => { //Encender servidor
    console.log("Servidor corriendo en http://localhost:3000");
});//mje en terminal: "Servidor funcionando en: http://localhost:3000"

