//SI LO PONES ADELANTE DEL SYNC HACE VALIDACION DE INICIO DE SECION  **isLoggedIn
//EVITA ENTRAR EN SONAS QUE NO TIENES CHANCE                   ******  isNotLoggedIn

module.exports ={
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/ingresar')
    },
    isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/perfil');
    }
};