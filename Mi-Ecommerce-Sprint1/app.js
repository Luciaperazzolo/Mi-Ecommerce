//Traigo la Heramienta
const express = require ('express');

//La pongo en función
const index = express ();

const port = 3000;

index.set ('view engine', 'ejs');

//Configuramos la ruta raíz
index.get ('/', (req, res) => {res.render("pages/index");
});

//Mensaje en terminal "Ya estoy Funcinando"
index.listen (port, () => {
    console.log('Aplicación funcionando en el puerto ${port}!');
});

