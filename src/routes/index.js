//consolida o agrupa todos los enrutadores
const {Router} = require("express")
const enrutadorGeneral = Router()
const enrutadorPrueba = require("./pruedaRouter")

enrutadorGeneral.use("/rutaPrueba", enrutadorPrueba)


module.exports = enrutadorGeneral;