const productos = require("../models/products.model"); 
const categorias = require("../models/categories.model"); 
const aromas = require("../models/scents.model"); 

const {unlinkSync} = require('fs');
const {resolve,path} = require('path');

const controller = {
    vistaPaginaPrincipal: (req,res) => {

        let categoriasDB = categorias.all()

        return res.render('index', {
            categorias: categoriasDB
        })
    },

    formularioGoogleSheet: (req,res) => {
        console.log(JSON.stringify(req.body));
    },
}

module.exports = controller