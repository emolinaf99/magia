const db = require('../database/models/index'); // trae toda la base de datos

const {unlinkSync} = require('fs');
const {resolve,path} = require('path');

const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

require('dotenv').config() // carga variables de entorno (ocultar contraseñas, ulrs o datos sensibles)

const controller = {
    
    loginProcess: async (req, res) => {
        //console.log(req.body);

        let userToLogin = await db.User.findOne({
            where: {
                User: req.body.user
            }
        });
        let categoriasDB =  await db.Categorias.findAll()
        
        const result = validationResult(req);
       
        if (!result.isEmpty()) {
            return res.render('login', {
                style: 'login',
                errors: result.mapped(),
                data: req.body,
                categorias: categoriasDB,
                informacionPaginaInicio: await db.PrincipalPage.findOne({
                    where: {
                        Id: 1
                    }
                })
            })
        }
        
        if (userToLogin) {
            
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.Password);
            if (isOkThePassword) {
                
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
        return res.render("/", {
            
            categorias: categoriasDB
        })
    },

    funcionesAdministradorVista: async (req,res) => {
        let informacionPaginaInicio = await db.PrincipalPage.findOne()
        let categorias =  await db.Categorias.findAll()
        let aromas =  await db.Esencias.findAll()

        // console.log(JSON.stringify(categorias,null,2));

        return res.render('functionsAdmin',{
            categorias: categorias,
            aromas: aromas,
            informacionPaginaInicio: informacionPaginaInicio
        })
    },

    loginAdmin: async (req,res) => {
        let informacionPaginaInicio = await db.PrincipalPage.findOne()
        let categorias =  await db.Categorias.findAll()

        return res.render('login', {
            categorias: categorias,
            informacionPaginaInicio: informacionPaginaInicio
        })
    },

    logout: (req, res) => {
        try {
            res.clearCookie('adminUser');
            req.session.destroy();
            return res.redirect('/')
        } catch (err) {
            console.log(err);
        }
    },
}

module.exports = controller