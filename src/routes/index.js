const express = require('express');
const enrutador = express.Router();

enrutador.get('/', (req,res) => {
    res.render('index');
});

module.exports = enrutador;