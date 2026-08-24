const express = require('express');

const app = express();

const MIPUERTO = 3333;

app.get("/", (_, res) => {
    res.send('API REST Full con Express');
});

app.listen(MIPUERTO, () => {
    console.log(`Servidor en funcionamiento en el puerto: ${MIPUERTO}`  );
});