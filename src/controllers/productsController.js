const products = require("../models/products.model"); 
const categories = require("../models/categories.model"); 
const scentses = require("../models/scents.model"); 

const {unlinkSync} = require('fs');
const {resolve,path} = require('path');

const controller = {
    vistaProductos: async (req,res) => {
        let productos = products.all()
        let categorias = categories.all()
        let productosFiltrados = productos.filter(product => product.categoria == req.params.idCategoria)

        return res.render('productos', {
            productos: productosFiltrados,
            categorias: categorias,
            category: req.params.idCategoria
        })
        
    },

    detalleProducto: (req,res) => {
        let todosLosAromas = scentses.all()
        let categorias = categories.all()
        let productos = products.all()
        let productoEncontrado = productos.find(producto => producto.id == req.params.idProducto)

        return res.render('detalle', {
            aromas: todosLosAromas,
            categorias: categorias,
            producto: productoEncontrado
        })
    }
}

module.exports = controller