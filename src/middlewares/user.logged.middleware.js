const user = require("../models/user.model")

function userLoggedMiddleware (req,res,next) {
    
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.adminUser;
    let userFromCookie = user.findByField("user", emailInCookie);

    if(userFromCookie && req.session.userLogged == undefined ) {
        //console.log(userFromCookie);
        req.session.userLogged = userFromCookie;
    }

    if(req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    

    next();
}

module.exports = userLoggedMiddleware;
    