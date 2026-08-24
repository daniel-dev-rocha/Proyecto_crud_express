import express from 'express';
import { configDotenv } from 'dotenv';
configDotenv();
const app = express();
const port = process.env.MIPUERTO || 3003

app.get("/", (_, res) => {
    res.send('API REST Full con Express');
});

app.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto: ${port}`  );
});