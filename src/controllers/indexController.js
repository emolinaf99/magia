const productos = require("../models/products.model"); 
const categorias = require("../models/categories.model"); 
const aromas = require("../models/scents.model"); 
const paginaPrincipalInfo = require("../models/principalPage.model"); 


const {unlinkSync} = require('fs');
const {resolve,path,join} = require('path');
const fs = require('fs'); // acceder a archivos

const controller = {

    vistaPaginaPrincipal: (req,res) => {

        let categoriasDB = categorias.all()
        let informacionPaginaInicio = paginaPrincipalInfo.findByPk(1)

        return res.render('index', {
            categorias: categoriasDB,
            informacionPaginaInicio: informacionPaginaInicio
        })
    },

    editarBannerPrincipal: (req, res) => {
        // Consulta la información de la página de inicio con clave primaria (PK) 1
        let informacionPaginaInicio = paginaPrincipalInfo.findByPk(1)
    
        // Construye la ruta del archivo de la foto anterior
        let fotoAnterior = join(__dirname, '../../public' + informacionPaginaInicio.imagenBanner)
    
        // Array para almacenar la información actualizada de la página de inicio
        let array = []; 
    
        // Verifica si hay un archivo en la solicitud (upload)
        if (req.file) {
            // Intenta eliminar la foto anterior
            try {
                fs.promises.unlink(fotoAnterior)
                console.log('File removed')
            } catch (err) {
                // Maneja errores si algo sale mal al eliminar el archivo
                console.error('Something wrong happened removing the file', err)
            }
    
            // Actualiza la ruta de la imagen en la información de la página de inicio
            informacionPaginaInicio.imagenBanner = '/images/' + req.file.filename
            array.push(informacionPaginaInicio)
    
            // Escribe la información actualizada en un archivo (por ejemplo, si paginaPrincipalInfo.FileName es una ruta válida)
            fs.writeFileSync(paginaPrincipalInfo.FileName, JSON.stringify(array, null, ' '))
            // Reescribe la información anterior con la nueva en un archivo
        }
    
        // Redirige a la página de funciones del administrador después de la operación
        return res.redirect('/funcionesAdministrador')
    },

    editarTextoAnimado: (req, res) => {
        //console.log(req.body);

        let informacionPaginaInicio = paginaPrincipalInfo.findByPk(1)

        let array = []

        informacionPaginaInicio.textoBanner = req.body.textoAnimacion

        array.push(informacionPaginaInicio)

        // Escribe la información actualizada en un archivo (por ejemplo, si paginaPrincipalInfo.FileName es una ruta válida)
        fs.writeFileSync(paginaPrincipalInfo.FileName, JSON.stringify(array, null, ' '))
        // Reescribe la información anterior con la nueva en un archivo

        return res.redirect('/funcionesAdministrador')

    },

    loginAdmin: (req,res) => {

        let categoriasDB = categorias.all()

        return res.render('login', {
            categorias: categoriasDB
        })
    },

    

    formularioGoogleSheet: (req,res) => {
        console.log(JSON.stringify(req.body));
    },
}

module.exports = controller