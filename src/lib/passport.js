const passport = require('passport');
const strategy = require('passport-local').Strategy;
const pool = require('../basededatos');
const apoyo = require('../lib/apoyo');

passport.use('local.ingresar', new strategy({
    usernameField: 'usuario',
    passwordField: 'contraseña',
    passReqToCallback: true
}, async (req, usuario, contraseña, done) =>{
    const rows = await pool.query('SELECT * FROM users WHERE usuario = ?', [usuario]);
    if(rows.length>0){
        const user = rows[0];
        const validacion = await apoyo.Comparacion(contraseña, user.contraseña);
        if(validacion){
            done(null, user, req.flash('success','Bienvenido '+ user.usuario));
        } else {
            done(null, false, req.flash('success','Contraseña incorrecta'));
        }
    }else{
        return done(null, false, req.flash('success','El usuario no existe: '));
    }
}));


passport.use('local.registro', new strategy({
    usernameField: 'usuario',
    passwordField:  'contraseña',
    passReqToCallback: true
}, async (req, usuario, contraseña, done)=>{
    const {sexo} = req.body;
    const {telefono} = req.body;
    const {correo} = req.body;
    const {comentarios}= req.body;
    const newUsuario = {
        usuario,
        contraseña,
        sexo,
        telefono,
        correo,
        comentarios
    }; 
    newUsuario.contraseña = await apoyo.encryptPassword(contraseña);
    const resultado = await pool.query('INSERT INTO users SET ?', newUsuario);
    newUsuario.id = resultado.insertId;
    return done(null, newUsuario);
}));



passport.serializeUser((usuario,done)=>{
    done(null, usuario.id);

});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, true, rows[0]);
  });