const producos = require("../models/products.model"); 
const categorias = require("../models/categories.model"); 
const aromas = require("../models/scents.model"); 

const {unlinkSync} = require('fs');
const {resolve,path} = require('path');

const controller = {
    vistaProductos: (req,res) => {
        res.render('productos')
        console.log(JSON.stringify(req.body));
    },

    detalleProducto: (req,res) => {
        let todosLosAromas = aromas.all()
        res.render('detalle', {
            aromas: todosLosAromas
        })
    }
}

module.exports = controller