const db = require("../database/models")


let userLoggedMiddleware = (req,res,next) => {
    let user = null;

    if (req.cookies.adminUser && req.session.userLogged == undefined){
        // Se buscan todos los usuarios
        db.User.findOne({
            where: {
                User: req.cookies.adminUser
            },
            
                
        }).then((userFound) => {

            //console.log(JSON.stringify(userFound,null,2));
            
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

    