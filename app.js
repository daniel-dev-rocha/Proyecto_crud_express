const express = require('express');

const app = express();

const MIPUERTO = 3333;

// middleware body-parse

app.use(express.json())

app.get("/", (_, res) => {
    res.send('API REST Full con Express');
});

app.get("/api/aprendices", (_, res) => {
    res.status(200).json({mensaje:'lista aprendices'})
});

app.post("/api/aprendices", (req, res) => {
    const datosAprendiz = req.body
    const edad = req.body.edad
     
    res.status(201).json({mensaje:'crear aprendiz', datos: datosAprendiz, estado: datosAprendiz >=18? 'Eres Mayor de Edad' : 'Eres menor de edad'})
    
});

app.put("/api/aprendices/:id_aprendices", (_, res) => {
    res.status(200).json({mesaje:'Actializar aprendiz'})
});

app.delete("/api/aprendices/:id_aprendices", (_, res) => {
    res.status(200).json({mensaje:'Eliminada'})
});
 
app.listen(MIPUERTO, () => {
    console.log(`Servidor en funcionamiento en el puerto: ${MIPUERTO}`  );
});

