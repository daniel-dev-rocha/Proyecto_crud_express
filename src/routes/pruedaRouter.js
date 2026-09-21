const { Router } = require("express");


const enrutadorPrueba = Router();


enrutadorPrueba.get("/rutapersonal", (req, res) => {
    res.json({ mensaje: "ruta personal" });
});

module.exports = enrutadorPrueba;
