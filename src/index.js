const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const db = require ("./config/db");

//Levantamos variables de entorno
require("dotenv").config();


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

//CADA VEZ QUE ENTRO EN MI API, A "/integrantes" ME TIRA LA PAGINA ABAJO Y NO SUPE COMO ARREGLARLO.
api.get("/integrantes", async (request, response) => {
    
    const respuesta = await db.query("select * from integrantes");
    const integ = respuesta.rows;  

    response.send(integ);

    if (!respuesta) {
        response.statusCode = 404;
        response.send({
            error: "Los integrantes no existen",
        });
        return;
    }
});


//Un enpint para acceder a las imagenes de mi api (para un futuro que mi formulario pida imagenes)
//api.get("/uploads/:filename", (request, response) => {
 //   const filename = request.patam.filename;
//   //Controlar el acceso a la imagen 
//   response.statusCode = 400;
//   response.send("No tiene acceso a las imagenes")
//});

//definir una ruta a mi api "NO SUPE COMO ENVIAR LA INFORMACION DEL FORMULARIO ENVIADO, A MI BD"
api.post("/formularios", uploadMiddleware.single("foto"), function (request, response) {
    const datos = request.body;
    const foto = request.file;
    console.log(datos, foto);
});



//Elegir un puerto para mi api
api.listen(5432, () => {
    console.log("la api se levanto correctamente");
});