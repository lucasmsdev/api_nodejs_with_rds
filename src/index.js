const express = require('express');
const routes = require('./routes')

const app = express()

const port = 8080;
const host = '0.0.0.0'

app.use(express.json());

app.use(routes);

app.listen(port, host, () =>{
    console.log(`Servidor rodando na porta correta`)
})