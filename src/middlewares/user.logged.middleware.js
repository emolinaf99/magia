const db = require("../database/models")


let userLoggedMiddleware = (req,res,next) => {
    let user = null;

    if (req.cookies.userCookie && req.session.userLogged == undefined){
        // Se buscan todos los usuarios
        db.Usuario.findOne({
            where: {
                Usuario: req.cookies.userCookie
            },
            // incluya la asociación entre usuario y persona para obtener los datos de persona
            include: [{association:'PersonaUsuario'}]
                
        }).then((userFound) => {

            //console.log(userFound);
            
            req.session.userLogged = userFound; // Lo asigno a la sesión
            
            // El resto sigue como estaba!
            if(req.session && req.session.userLogged) {
                user = req.session.userLogged
            }

            res.locals.userLogged = user;
            return next();

        }).catch((err) => {
            console.log(err);
        });
        
    } else {
        
        res.locals.userLogged = req.session.userLogged
        
        return next()
    }

    
};

module.exports = userLoggedMiddleware

    