//--- IMPORTACIÓN DE MÓDULOS ---
const express = require("express"); // Traigo la herramienta Express
const path = require("path"); // Módulo nativo para trabajar con rutas de carpetas

const app = express(); // Pongo Express en funcionamiento

//--- MIDDLEWARES ---
app.use(express.urlencoded({ extended: true })); //prepara el proyecto para: login, register, carrito
app.use(express.json()); // Permite recibir datos en formato JSON

//--- IMPORTACIÓN DE RUTAS ---
const mainRoutes = require("./src/routes/mainRoutes"); // Traigo las rutas principales desde la carpeta routes

//--- CONFIGURACIÓN DEL SERVIDOR ---
app.set("view engine", "ejs"); // Indico que usaré EJS como motor de plantillas

app.set("views", path.join(__dirname, "views")); // Le digo dónde están guardadas las vistas

app.use(express.static(path.join(__dirname, "assets"))); // Habilito la carpeta assets para usar CSS, imágenes y archivos públicos

//--- DEFINICIÓN DE RUTAS --- //User Story #1 (Sprint 2) – Reordenar Proyecto
app.use("/", mainRoutes);  
// Todas las rutas principales ahora se manejan desde mainRoutes.js 

//--- ERROR 404 ---
app.use((req, res) => {
    res.status(404).render("pages/404");
});

//--- PUESTA EN MARCHA ---
app.listen(3000, () => { // Encender servidor
    console.log("Servidor corriendo en http://localhost:3000");
}); 