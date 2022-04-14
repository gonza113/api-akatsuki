const express = require("express");

//creamos nuestra api en express
const api = express();

//definir ua ruta  ami api
api.get('/', (req, res) => {
    res.send("Entraste bien");
});

api.get('/usuarios', (req, res) => {
    const fabio = {
        id: 1,
        nombre: "Fabian",
        apellido: "Bordagorri",
        edad: "26",
    }
    res.send(fabio);
});
//Elegir un puerto para mi api
api.listen(3500, () => {
    console.log("la api se levanto correctamente");
});