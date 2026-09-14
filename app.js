const express = require('express');
require('dotenv').config();

const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//usar nuestros middleware


const PUERTO = process.env.MIPUERTO || 3003;
// Importar mis middleware

const registroMiddleware = require("./middleware/registroMiddleware")
app.use(registroMiddleware)

const manejoErroresMiddleware = require("./middleware/manejadoErroresMiddleware")


// Librerías
const sistemaArchivo = require('fs');
const ruta = require('path');
const multer = require('multer');


// Validaciones
const {
    validarNombre,
    validarCorreo
} = require('./validaciones/validacioness');


// Archivo JSON
const rutaMiArchivo = ruta.join(__dirname, "datos.json");


// MULTER

const almacen = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "misImagenes/");
    },
    filename: (req, file, cb) => {
        const extension = ruta.extname(file.originalname);
        cb(null, `${Date.now()}${extension}`);
    }
});
const subir = multer({
    storage: almacen
});



// RUTA PRINCIPAL


app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'API REST Full con Express'
    });
});



// GET - TODOS LOS APRENDICES

app.get('/api/aprendices', (req, res) => {
    sistemaArchivo.readFile(
        rutaMiArchivo,
        "UTF-8",
        (error, datos) => {
            if (error) {
                return res.status(500).json({
                    Error: "No se puede leer el archivo"
                });
            }
            const listaAprendices = JSON.parse(datos);
            res.status(200).json({
                Listado: listaAprendices
            });
        }
    );
});



// GET - APRENDIZ POR ID


app.get('/api/aprendices/:id', (req, res) => {
    const id = req.params.id;
    sistemaArchivo.readFile(
        rutaMiArchivo,
        "UTF-8",
        (error, datos) => {
            if (error) {
                return res.status(500).json({
                    Error: "No se puede leer el archivo"
                });
            }
            const listaAprendices = JSON.parse(datos);
            const aprendiz = listaAprendices.find(
                aprendiz => aprendiz.id == id
            );
            if (!aprendiz) {
                return res.status(404).json({
                    error: "Aprendiz no encontrado"
                });
            }
            res.status(200).json(aprendiz);
        }
    );

});



// POST - CREAR APRENDIZ

app.post(
    "/api/aprendices",
    subir.single("imagen"),
    (req, res) => {
        const datosAprendiz = req.body;
        // Validar nombre
        if (!validarNombre(datosAprendiz.nombre)) {
            return res.status(400).json({
                error: "El nombre debe tener más de 3 letras"
            });
        }
        // Validar correo
        if (!validarCorreo(datosAprendiz.correo)) {
            return res.status(400).json({
                error: "El correo no es válido"
            });
        }
        // Guardar imagen
        datosAprendiz.imagen = req.file
            ? `/misImagenes/${req.file.filename}`
            : "sin imagen";
        sistemaArchivo.readFile(
            rutaMiArchivo,
            "UTF-8",
            (error, datos) => {
                if (error) {
                    return res.status(500).json({
                        Error: "No se puede leer el archivo"
                    });
                }
                const listaAprendices = JSON.parse(datos);
                // Crear ID
                if (listaAprendices.length === 0) {

                    datosAprendiz.id = 1;

                } else {

                    datosAprendiz.id =
                        listaAprendices[listaAprendices.length - 1].id + 1;

                }
                // Agregar aprendiz
                listaAprendices.push(datosAprendiz);
                // Guardar archivo
                sistemaArchivo.writeFile(
                    rutaMiArchivo,
                    JSON.stringify(listaAprendices, null, 2),
                    (error) => {
                        if (error) {
                            return res.status(500).json({
                                error: "No se puede escribir el file"
                            });
                        }
                        res.status(201).json({
                            mensaje: "creado",
                            datosAprendiz
                        });

                    }
                );

            }
        );

    }
);



// PUT - ACTUALIZAR APRENDIZ


app.put(
    '/api/aprendices/:id',
    subir.single("imagen"),
    (req, res) => {
        const id = req.params.id;
        sistemaArchivo.readFile(
            rutaMiArchivo,
            "UTF-8",
            (error, datos) => {
                if (error) {
                    return res.status(500).json({
                        error: "No se puede leer el archivo"
                    });

                }
                const listaAprendices = JSON.parse(datos);
                // Buscar aprendiz
                const aprendiz = listaAprendices.find(
                    aprendiz => aprendiz.id == id
                );
                if (!aprendiz) {

                    return res.status(404).json({
                        error: "Aprendiz no encontrado"
                    });
                }
                // Validar nombre
                if (
                    req.body.nombre &&
                    !validarNombre(req.body.nombre)
                ) {

                    return res.status(400).json({
                        error: "El nombre debe tener más de 3 letras"
                    });
                }
                // Validar correo
                if (
                    req.body.correo &&
                    !validarCorreo(req.body.correo)
                ) {

                    return res.status(400).json({
                        error: "El correo no es válido"
                    });

                }
                // Actualizar datos
                Object.assign(aprendiz, req.body);
                // Actualizar imagen
                if (req.file) {

                    aprendiz.imagen =
                        `/misImagenes/${req.file.filename}`;
                }
                // Guardar
                sistemaArchivo.writeFile(
                    rutaMiArchivo,
                    JSON.stringify(listaAprendices, null, 2),
                    (error) => {
                        if (error) {
                            return res.status(500).json({
                                error: "No se puede escribir el file"
                            });
                        }
                        res.status(200).json({
                            mensaje: "Actualizado",
                            aprendiz
                        });

                    }
                );

            }
        );

    }
);


// DELETE - ELIMINAR APRENDIZ

app.delete(
    '/api/aprendices/:id',
    (req, res) => {
        const id = req.params.id;
        sistemaArchivo.readFile(
            rutaMiArchivo,
            "UTF-8",
            (error, datos) => {
                if (error) {
                    return res.status(500).json({
                        error: "No se puede leer el archivo"
                    });
                }
                const listaAprendices = JSON.parse(datos);
                // Buscar posición
                const indice = listaAprendices.findIndex(
                    aprendiz => aprendiz.id == id
                );
                if (indice === -1) {

                    return res.status(404).json({
                        error: "Aprendiz no encontrado"
                    });
                }
                // Eliminar
                listaAprendices.splice(indice, 1);
                // Guardar
                sistemaArchivo.writeFile(
                    rutaMiArchivo,
                    JSON.stringify(listaAprendices, null, 2),
                    (error) => {

                        if (error) {

                            return res.status(500).json({
                                error: "No se puede escribir el file"
                            });

                        }
                        res.status(200).json({
                            mensaje: "Eliminado"
                        });

                    }
                );

            }
        );

    }
);




app.get("/api/error", (req,res, next)=>{
    next(new Error("Esto es un error provocado"))
})


app.use(manejoErroresMiddleware)

// ==================================================
// SERVIDOR
// ==================================================

app.listen(PUERTO, () => {

    console.log(
        `Servidor ejecutándose en http://localhost:${PUERTO}`
    );

});


