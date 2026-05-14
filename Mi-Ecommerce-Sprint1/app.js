//--- IMPORTACIÓN DE MÓDULOS ---
const express = require("express"); //Traigo la herramienta Express
const session = require('express-session'); //Traigo el módulo de sesiones para manejar el carrito de compras
const path = require("path"); //Módulo nativo para trabajar con rutas de carpetas
const app = express(); //Pongo Express en funcionamiento

//--- CONFIGURACIÓN DE VISTAS --- 
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views")); 


//--- MIDDLEWARES ---
app.use(express.static(path.join(__dirname, "assets"))); 
app.use(express.urlencoded({ extended: true })); //prepara el proyecto para: login, register, carrito
app.use(express.json()); //Permite recibir datos en formato JSON


//--- CONFIGURACIÓN DE SESIONES ---
app.use(session({ //Configura el middleware de sesiones para manejar el carrito de compras. Esto permite almacenar información del carrito en la sesión del usuario, lo que es útil para mantener el estado del carrito mientras el usuario navega por el sitio.
    secret: 'claveUltraSecreta_carrito',
    resave: false,
    saveUninitialized: false
}));

//--- IMPORTACIÓN DE RUTAS ---
const mainRoutes = require("./src/routes/mainRoutes"); //Traigo las rutas principales desde la carpeta routes
const cartRoutes = require("./src/routes/cartRoute"); //Traigo las rutas del carrito desde la carpeta routes
const productsRouter = require("./src/routes/productsRouter"); // Rutas de productos

//--- CONFIGURACIÓN DEL SERVIDOR ---
app.set("view engine", "ejs"); // Indico que usaré EJS como motor de plantillas
app.set("views", path.join(__dirname, "src", "views")); // CORRECCIÓN: Le digo dónde están guardadas las vistas (dentro de src)
app.use(express.static(path.join(__dirname, "assets"))); // Habilito la carpeta assets para usar CSS, imágenes y archivos públicos

//--- DEFINICIÓN DE RUTAS --- //User Story #1 (Sprint 2) – Reordenar Proyecto
app.use("/", mainRoutes);  
app.use("/cart", cartRoutes);
app.use("/products", productsRouter); //   rutas de productos

//--- ERROR 404 ---
app.use((req, res) => {
    res.status(404).render("pages/404");
});

//--- PUESTA EN MARCHA ---
app.listen(3000, () => { // Encender servidor
    console.log("Servidor corriendo en http://localhost:3000");
});
