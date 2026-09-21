require("dotenv").config();

const express = require("express");
const enrutadorGeneral = require("./routes");

const app = express()

//importar los modulos
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//dembemos importar los enrutadores a la carpeta router
app.use("/api", enrutadorGeneral)

//endpoint de la ruta raiz, de bienvenida a la API

app.get("/", (req, res,) => {
    res.send("Api rest 347182 funcionando")
})

module.exports = app;
