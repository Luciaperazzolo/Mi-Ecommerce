//--- IMPORTACIÓN DE MÓDULOS ---
require('./src/db/database'); // Importamos la configuración de la base de datos 
const express = require("express"); //Traigo la herramienta Express
const expressLayouts = require('express-ejs-layouts'); // <-- TRAIGO LA LIBRERÍA DE LAYOUTS
const session = require('express-session'); //Traigo el módulo de sesiones para manejar el carrito de compras
const cors = require("cors"); //Permite que el servidor acepte solicitudes de diferentes dominios
const path = require("path"); //Módulo nativo para trabajar con rutas de carpetas
const app = express(); //Pongo Express en funcionamiento

//--- CONFIGURACIÓN DE VISTAS Y ESTÁTICOS --- 
app.set("view engine", "ejs"); // Indico que usaré EJS como motor de plantillas
app.set("views", path.join(__dirname, "src", "views")); // Le digo dónde están guardadas las vistas

app.use(expressLayouts); // <-- ACTIVO LA LIBRERÍA
app.set('layout', 'layouts/main'); // <-- LE DIGO QUE EL MOLDE PRINCIPAL ES EL DE TU COMPAÑERO

app.use(express.static(path.join(__dirname, "assets"))); // Habilito la carpeta assets para usar CSS, imágenes y archivos públicos

//--- MIDDLEWARES ---
app.use(cors());
app.use(express.urlencoded({ extended: true })); //prepara el proyecto para: login, register, carrito
app.use(express.json()); //Permite recibir datos en formato JSON

//--- CONFIGURACIÓN DE SESIONES ---
app.use(session({ 
    secret: 'claveUltraSecreta_carrito',
    resave: false,
    saveUninitialized: false
}));

//--- MIDDLEWARE PARA CONTAR LOS ARTÍCULOS EN EL CARRITO Y USUARIO EN SESIÓN ---
app.use((req, res, next) => {
    const cartSession = req.session.cart || [];
    const cartCount = cartSession.reduce((acc, item) => acc + item.quantity, 0);
    res.locals.cartCount = cartCount;
    res.locals.user = req.session.user || null;
    next();
});

//--- IMPORTACIÓN DE RUTAS ---
const mainRoutes = require("./src/routes/mainRoutes"); //Traigo las rutas principales desde la carpeta routes
const cartRoutes = require("./src/routes/cartRoute"); //Traigo las rutas del carrito desde la carpeta routes
const productsRouter = require("./src/routes/productsRouter"); // Rutas de productos
const productsApiRoutes = require("./src/routes/api/productsApiRoutes"); // Rutas de productos para la API
const categoriesApiRoutes = require("./src/routes/api/categoriesApiRoutes");
const statsApiRoutes = require("./src/routes/api/statsApiRoutes");

//--- DEFINICIÓN DE RUTAS --- 
app.use("/", mainRoutes);  
app.use("/cart", cartRoutes);
app.use("/products", productsRouter); // rutas de productos
app.use("/api/products", productsApiRoutes); // rutas de productos para la API
app.use("/api/categories", categoriesApiRoutes); // rutas de categorías para la API
app.use("/api/stats", statsApiRoutes); // rutas de estadísticas para la API

//--- ERROR 404 ---
app.use((req, res) => {
    res.status(404).render("pages/404");
});

//--- ERROR 500 ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/500');
});

//--- PUESTA EN MARCHA ---
app.listen(3000, () => { // Encender servidor
    console.log("Servidor corriendo en http://localhost:3000");
});