const {body} = require('express-validator');
const db = require("../database/models/index");
const bcrypt = require('bcryptjs');

const user = body('user')
.notEmpty().withMessage('Campo obligatorio').bail()
.custom((value, {req}) => {
   return  db.User.findOne({
        where:{
            User:req.body.user
        }
    }).then((result)=>{
        //console.log(result);
        if (!result){
            throw new Error('Este usuario no esta registrado')
        }
    }).catch((err)=>{
        throw new Error('Este usuario no esta registrado')
    })

}); 

const password = body('password').notEmpty().withMessage('Campo obligatorio').bail()
.custom((value, {req}) =>{
    //console.log(req.body);
   return db.User.findOne({
        where:{
            User: req.body.user
        }
    }).then((result) => {
    
        let passwordOk = bcrypt.compareSync(req.body.password, result.Password);
        
        if(passwordOk == false){
            throw new Error('Contraseña incorrecta')
        }
        return true 
    }).catch((err) => {
        throw new Error('Contraseña incorrecta')
    })
}); 

const validationsLogin = [user, password]



module.exports = validationsLogin; 