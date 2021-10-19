const express = require('express');
const enrutador = express.Router();
const passport = require('passport');
 
const { isLoggedIn, isNotLoggedIn } = require('../lib/autenticar')

enrutador.get('/registro', isNotLoggedIn, (req,res) =>{
    res.render('autenticacion/registro')
});

enrutador.post('/registro',isNotLoggedIn, passport.authenticate('local.registro',{
    successRedirect: '/perfil', 
    failureRedirect: '/registro',
    failureFlash: true
}));

enrutador.get('/ingresar', isNotLoggedIn, (req,res)=>{
    res.render('autenticacion/ingresar')
});

enrutador.post('/ingresar', isNotLoggedIn, (req,res,next) =>{
    passport.authenticate('local.ingresar', {
        successRedirect: '/perfil',
        failureRedirect: '/ingresar',
        failureFlash: true
    })(req, res, next);
});

                    //valida isLoggedIn para que siga navegando
enrutador.get('/perfil', isLoggedIn,(req,res)=>{
    res.render('perfil');
});

enrutador.get('/cerrar', isLoggedIn, (req, res)=>{
    req.logOut();
    res.redirect('/ingresar');
});



module.exports = enrutador;
