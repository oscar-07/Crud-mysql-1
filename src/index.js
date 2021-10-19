const express = require('express');
const morgan = require('morgan');
const molde = require('express-handlebars');
const unir = require ('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const {basededatos} = require('./llaves'); 
const passport = require('passport');


//iniciar
const aplicacion = express();
require('./lib/passport');

//el puerto asignado o 3000
aplicacion.set('port', process.env.PORT || 3000);
aplicacion.set('views', unir.join(__dirname, 'views'));

aplicacion.engine('.hbs', molde({
    defaultLayout: 'main',
    layoutsDir: unir.join(aplicacion.get('views'), 'layouts'),
    partialsDir: unir.join(aplicacion.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
aplicacion.set('view engine', '.hbs');


//middleware funcionas que hacen peticiones a servidor 

aplicacion.use(session({
    secret: 'nododesesion',
    resave: false,
    saveUninitialized: false
    //store: new MySQLStore (basededatos)
}));
aplicacion.use(flash());
aplicacion.use(morgan('dev'));
//restringir
aplicacion.use(express.urlencoded({extended: false}));
aplicacion.use(express.json());
aplicacion.use(passport.initialize());
aplicacion.use(passport.session());



//variables globales
aplicacion.use((req,res,next) =>{
                //asi se llama seccess
    aplicacion.locals.success = req.flash('success');
    aplicacion.locals.message = req.flash('message');
    aplicacion.locals.user = req.user;
    //aplicacion.locals.usuario = req.user || null;
    
    next();
    
    //aplicacion.locals.user = req.user;
    //next();
    //aplicacion.locals.usuario = req.user;   
    /*
    console.log('hola',req.user);
    let usuario = null;
    if(req.user){
        usuario =JSON.parse(JSON.stringify(req.user));
        console.log('revisa',usuario);
    } 
    aplicacion.locals.usuario = usuario;   
    next();
    */
});

//rutas las url
aplicacion.use(require('./routes'));
aplicacion.use(require('./routes/autenticar'));
aplicacion.use('/enlaces', require('./routes/enlaces'));




//Lo que el codigo puede acceder
aplicacion.use(express.static(unir.join(__dirname, 'public')));


//inicia el servidor
aplicacion.listen(aplicacion.get('port'), () =>{
    console.log('Conectado ', aplicacion.get('port'));
});