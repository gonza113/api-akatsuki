const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const db = require ("./config/db");

//Levantamos variables de entorno
require("dotenv").config();
console.log(process.env.DB_USER);

//creamos nuestra api en express
const api = express();

//configuramos multer
const uploadMiddleware = multer({ dest: path.join("public", "uploads") });
//Se habilita el acceso a las imagenes en public/uploads
//api.use(express.static(path.join(__dirname, "..", "public")));

//Habilitamos CORS y midware externos
api.use(cors());
api.use(bodyParser.urlencoded({ extended: false}));
api.use(bodyParser.json());


api.get("/integrantes", async (request, response) => {
    
    const respuesta = await db.query("select * from integrantes");
    const integ = respuesta.rows;  

    response.send(integ);
});


//Un enpint para acceder a las imagenes de mi api (para un futuro que mi formulario pida imagenes)
//api.get("/uploads/:filename", (request, response) => {
 //   const filename = request.patam.filename;
//   //Controlar el acceso a la imagen 
//   response.statusCode = 400;
//   response.send("No tiene acceso a las imagenes")
//});

//definir una ruta a mi api
api.post("/integrantes-api", uploadMiddleware.single("foto"), function (request, response) {
    const datos = request.body;
    const foto = request.file;
    console.log(datos, foto);
});

//api.get("/integrantes-api", (req, res) => {
//    const form = api.post;
 //   res.send(form);
//})

//Elegir un puerto para mi api
api.listen(5432, () => {
    console.log("la api se levanto correctamente");
});