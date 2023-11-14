const products = require("../models/products.model"); 
const categorias = require("../models/categories.model"); 
const scentses = require("../models/scents.model"); 
const User = require("../models/user.model"); 

const {unlinkSync} = require('fs');
const {resolve,path} = require('path');

const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

require('dotenv').config() // carga variables de entorno (ocultar contraseñas, ulrs o datos sensibles)

const controller = {
    
    loginProcess: async (req, res) => {
        //console.log(req.body);

        let userToLogin = await User.findByField('user', req.body.user);
        let categoriasDB =  await categorias.all()
        
        const result = validationResult(req);
       
        if (!result.isEmpty()) {
            return res.render('login', {
                style: 'login',
                errors: result.mapped(),
                data: req.body,
                categorias: categoriasDB
            })
        }
        
        if (userToLogin) {
            
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                
                delete userToLogin.password;
                req.session.userLogged = userToLogin; // reescribe la info anterior por la nueva
                                            
                if (req.body.remUser) {
                    res.cookie("adminUser", req.body.user, /*{ maxAge: (1000 * 60) * 120 }*/)
                }
                //console.log('primer return');
                return res.redirect("/")
            }
            //console.log('segundo return');
            return res.render('login', {
                
                categorias: categoriasDB,
                
            });
        }
        //console.log('tercer return');
        return res.render("login", {
            
            categorias: categoriasDB
        })
    },

    funcionesAdministradorVista: async (req,res) => {
        return res.render('functionsAdmin',{
            categorias: await categorias.all()
        })
    }
}

module.exports = controller