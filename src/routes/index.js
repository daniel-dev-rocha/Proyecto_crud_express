//consolida o agrupa todos los enrutadores
const {Router} = require("express")
const enrutadorGeneral = Router()
const enrutadorPrueba = require("./pruedaRouter")

//importar enrutadorAuth 
const enrutadorAuth = require("./auntenticarRouter")

enrutadorGeneral.use("/rutaPrueba", enrutadorPrueba)
enrutadorGeneral.use("/auntenticar", enrutadorAuth)

module.exports = enrutadorGeneral;



