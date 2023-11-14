const {body} = require('express-validator');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


const user = body('user')
.notEmpty().withMessage('Campo obligatorio!').bail()
.custom((value, {req}) => {
    
    try {

        let userToLogin = User.all()
        let userFound = userToLogin.find(usuario => usuario.user == req.body.user);

        console.log(userFound);
        if (!userFound){
            
            throw new Error('Usuario incorrecto')
        } else {
            return true
        }
        

    } catch (err) {
       throw new Error('Usuario incorrecto')
    }
    
}); 

const password = body('password').notEmpty().withMessage('Campo obligatorio!').bail() 
.custom((value, {req}) => {

    try {
        
        let userToLogin = User.findByField(req.body.user);
        if (userToLogin){
            let passwordOk = bcrypt.compareSync(req.body.password, userToLogin.password)

            if(passwordOk == false) {
                throw new Error('Contraseña incorrecta')
            }
            return true
        }
        

    } catch (err) {
       throw new Error('Contraseña incorrecta')
    }
    
})


const validationsLogin = [user, password]



module.exports = validationsLogin; 