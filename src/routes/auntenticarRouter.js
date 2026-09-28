const { Router } = require ("express");

const enrutadorAuth = Router();
//importacion 
const iniciarSesion = require ("../controllers/auntenticarController.js")

// ruta vde registro en el sistema
enrutadorAuth.post("/registro", (req, res) => {
    res.json({mensaje: "ruta de registro"})
 })

 //ruta de inicio de sesion
enrutadorAuth.post("login", iniciarSesion)

//se realiza todas las rutas, con (POST, PUT, DELETE)
module.exports = enrutadorAuth;
