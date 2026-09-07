const { error } = require('console');
const express = require('express');

const app = express();


const MIPUERTO = 3000;

//libreriaa fs, path

const sistemaArchivos = require ("fs") 
const ruta = require ("path")
const rutaMiArchivo = ruta.join(__dirname,"datos.json")

const multer = require("multer")
const almacen = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, "misImagenes/")},
    filename: (req, file, cb) => {
        const extension = ruta.extname(file.originalname)
        cb(null, `${Date.now()}${extension}`)}
})

const subir = multer({storage: almacen})


// middleware body-parse

app.use(express.json())

app.use(express.urlencoded({extended : true}))

app.get("/", (_, res) => {
    res.send('API REST Full con Express');
});

app.get("/api/aprendices", (_, res) => {
    sistemaArchivos.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
        if (error) res.status(500).json({Error: "No se puede leer el archivo"})
        const listaAprendices = JSON.parse (datos)
        res.status(200).json({Listado: listaAprendices})
    })
    //res.status(200).json({mensaje:'lista aprendices'})//
});

//app.post("/api/aprendices", (req, res) => {
    //const datosAprendiz = req.body
    //const edad = req.body.edad
     
    //res.status(201).json({mensaje:'crear aprendiz', datos: datosAprendiz, estado: datosAprendiz >=18? 'Eres Mayor de Edad' : 'Eres menor de edad'})
    
//});

app.post("/api/aprendices", subir.single("imagen"), (req, res) => {
    const datosAprendiz = req.body
    datosAprendiz.imagen= req.file?`/misImagenes/${req.file.filename}`:"sin Imagenes"
    console.log(datosAprendiz)
    sistemaArchivos.readFile(rutaMiArchivo, "utf-8", (error, datos) => {
        if (error) res.status(500).json({Error: "No se puede leer el archivo"})
        const listaAprendices = JSON.parse (datos)
        listaAprendices.push(datosAprendiz)
        sistemaArchivos.writeFile(rutaMiArchivo, JSON.stringify(listaAprendices, null, 2), (error) => { 
        if (error) res.status(500).json({Error: "No se escribir en el archivo"})
        res.status(200).json({Mensaje:"creado", datos:datosAprendiz})})
    })

});

app.put("/api/aprendices/:id_aprendices", (_, res) => {
    res.status(200).json({mesaje:'Actializar aprendiz'})
});

app.delete("/api/aprendices/:id_aprendices", (_, res) => {
    res.status(200).json({mensaje:'Eliminada'})
});
 
app.listen(MIPUERTO, () => {
    console.log(`Servidor en funcionamiento en el puerto: ${MIPUERTO}`);
});

