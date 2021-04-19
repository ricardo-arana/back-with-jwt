const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { dbConection } = require('./database/config.js');
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tareas', require('./routes/tareas'));
dbConection();

app.get('/', (req, res) => {
    res.send('hola')
})

app.listen( process.env.PORT , () => {
    console.log('servidor corriendo en el puerto ' + process.env.PORT)
})


