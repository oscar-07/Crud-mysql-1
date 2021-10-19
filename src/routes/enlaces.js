const { Router } = require('express');
const express = require('express');
const enrutador = express.Router();
const pool = require('../basededatos')

const { isLoggedIn } = require('../lib/autenticar')

enrutador.get('/agregar', isLoggedIn, (req,res) =>{
    res.render('enlaces/agregar');
});
//async
enrutador.post('/agregar', isLoggedIn, async (req,res)=>{
    const {titulo, url, descripcion} = req.body;
    const nuevoobjeto ={
        titulo,
        url,
        descripcion
        //user_id: req.user.id      //*********ojo aqui vincula */
    };
    await pool.query('INSERT INTO datos set ?',[nuevoobjeto]);
    req.flash('success', 'Agregado correctamente');
    res.redirect('/enlaces');
});


        //le tenemos que dar akgi
enrutador.get('/', isLoggedIn, async (req,res) =>{
    const datos = await pool.query('SELECT * FROM datos');           //********* TODO LO VINCULADO AL USUARIO */
    //const datos = await pool.query('SELECT * FROM datos WHERE user_id = ?',[req.user.id]);
    //console.log(datos);
    res.render('enlaces/datos', {datos});
});


enrutador.get('/borrar/:id', isLoggedIn, async (req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM datos WHERE ID = ?',[id]);
    req.flash('success','Borrado correctamente');
    res.redirect('/enlaces');
});


enrutador.get('/editar/:id', isLoggedIn, async (req,res)=>{
    const {id} = req.params;
    const datos = await pool.query('SELECT * FROM datos WHERE ID = ?',[id]);
    //console.log(datos[0]);
    res.render('enlaces/editar',{datos: datos[0]});
});

enrutador.post('/editar/:id', isLoggedIn, async (req, res)=> {
    const {id} = req.params;
    const {titulo, url, descripcion} = req.body;
    const nuevoEnlace = {
        titulo,
        url,
        descripcion
    };
    await pool.query('UPDATE datos set ? WHERE id = ?', [nuevoEnlace, id]);
            //tipo de mensaje
    req.flash('success','Editado correctamente');
    res.redirect('/enlaces');
});


module.exports = enrutador;