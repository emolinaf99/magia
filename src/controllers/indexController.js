
const db = require('../database/models/index'); // trae toda la base de datos

const {unlinkSync} = require('fs');
const {resolve,path,join} = require('path');
const fs = require('fs'); // acceder a archivos

const correoNotificacion = require('../../public/js/notificacionCorreo') // function para enviar correos

const controller = {

    vistaPaginaPrincipal: async (req,res) => {

        let categoriasDB = await db.Categorias.findAll()
        let informacionPaginaInicio = await db.PrincipalPage.findOne({
            where: {
                Id: 1
            }
        })
        

        return res.render('index', {
            categorias: categoriasDB,
            informacionPaginaInicio: informacionPaginaInicio
        })
    },

    editarBannerPrincipal: (req, res) => {
        try {
            // Consulta la información de la página de inicio con clave primaria (PK) 1
            db.PrincipalPage.findOne({
                where: {
                    Id: 1
                }
            })
            .then((informacionPaginaInicio) => {

                // Construye la ruta del archivo de la foto anterior
                let fotoAnterior = join(__dirname, '../../public' + informacionPaginaInicio.ImagenBanner);
        
                // Verifica si hay un archivo en la solicitud (upload)
                if (req.file) {
                    // Intenta eliminar la foto anterior
                    try {
                        db.PrincipalPage.update(
                            {
                                ImagenBanner: '/images/' + req.file.filename
                            },
                            {
                                where: {
                                    Id: 1
                                }
                            }
                        )
                        .then((cambioRealizado) => {
                            fs.promises.unlink(fotoAnterior);
                            console.log('File removed');
                        })

        
                    } catch (err) {
                        // Maneja errores si algo sale mal al actualizar la base de datos o eliminar el archivo
                        console.error('Error updating the database or removing the file', err);
                        return res.status(500).send('Internal Server Error');
                    }
                }
        
                // Redirige a la página de funciones del administrador después de la operación
                return res.redirect('/funcionesAdministrador');
                })
    
            
        } catch (error) {
            console.error('Error in the main function', error);
            return res.status(500).send('Internal Server Error', err);
        }
    },

    editarTextoAnimado: (req, res) => {
        try {
    
            db.PrincipalPage.update({
                TextoBanner: req.body.textoAnimacion
            },
            {
                where: {
                    Id: 1
                }
            });
    
            return res.redirect('/funcionesAdministrador');
        } catch (error) {
            console.error('Ha ocurrido un error al editar el texto animado', error);
            return res.status(500).send('Error interno del servidor al editar el texto animado');
        }
    },

    formularioMayorista: (req,res) => {
        console.log(JSON.stringify(req.body,null,2));

        let informacion = {
            nombre: req.body.nombre,
            pais: req.body.pais,
            ciudad: req.body.ciudad,
            numero: req.body.numero,
            correo: req.body.correo,
            msg: req.body.mensaje
        }

        try {
            correoNotificacion(0,informacion, 'nothing')
        } catch (err) {
            console.error('Ha ocurrido un error al enviar la notificacion',err);
        }

        return res.redirect('/')
    },
}

module.exports = controller