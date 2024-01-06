const db = require('../database/models/index'); // trae toda la base de datos

const {unlinkSync} = require('fs');
const {resolve,path,join} = require('path');
const fs = require('fs'); // acceder a archivos

const controller = {

    vistaProductos: async (req,res) => {

        let categorias = await db.Categorias.findAll()
       
        let categoria = await db.Categorias.findOne({
            where: {
                Id: req.params.idCategoria
            }
        })
        let productosFiltrados = await db.Productos.findAll({
            where: {
                Categoria: req.params.idCategoria
            }
        })

        // console.log(JSON.stringify(categorias,null,2));

        return res.render('productos', {
            productos: productosFiltrados,
            categorias: categorias,
            categoria: categoria
        })
        
    },

    detalleProducto: async (req,res) => {
        let todosLosAromas = await db.Esencias.findAll()
        let categorias = await db.Categorias.findAll()
        let productos = db.Productos.findAll()
        let productoEncontrado = await db.Productos.findOne({
            where: {
                Id: req.params.idProducto
            },
            include:[{association:'Producto_Categoria'}]
        })

        return res.render('detalle', {
            aromas: todosLosAromas,
            categorias: categorias,
            producto: productoEncontrado
        })
    },

    editarProducto: (req,res) => {
        // console.log(req.body);
        // console.log(req.files);

        db.Productos.findOne({
            where: {
                Id: req.params.idProduct
            }
        })
        .then((productoEncontrado) => {
            let imagenPrincipalAnterior = productoEncontrado.ImagenPrincipal
            let imagenDosAnterior = productoEncontrado.ImagenDos
            let imagenTresAnterior = productoEncontrado.ImagenTres

            // Construye la ruta del archivo de la foto anterior
            let joinPath = join(__dirname, '../../public')

            if(req.files) {

                try {
                    if(req.files.imagenPrincipal){
                        fs.promises.unlink(joinPath + imagenPrincipalAnterior)
                        console.log('Imagen principal eliminada')
                    }
                    if(req.files.imagenDos){
                        fs.promises.unlink(joinPath + imagenDosAnterior)
                        console.log('Imagen dos eliminada')
                    }
                    if(req.files.imagenTres){
                        fs.promises.unlink(joinPath + imagenTresAnterior)
                        console.log('Imagen tres eliminada')
                    }
                    
                    
                }catch(err) {
                    console.error('Ha ocurrido un error eliminando las imagenes anteriores',err)
                }
            }

            db.Productos.update({
                Name: req.body.name,
                Categoria: req.body.categoria,
                Descripcion: req.body.descripcion,
                Presentacion: req.body.presentacion,
                Precio: req.body.precio,
                ImagenPrincipal: req.files.imagenPrincipal ? '/images/' + req.files.imagenPrincipal[0].filename : imagenPrincipalAnterior,
                ImagenDos: req.files.imagenDos ? '/images/' + req.files.imagenDos[0].filename : imagenDosAnterior,
                ImagenTres: req.files.imagenTres ? '/images/' + req.files.imagenTres[0].filename : imagenTresAnterior,
            }, {
                where: {
                    Id: req.params.idProduct
                }
            })
            .then((productoModificado) => {
                console.log('El producto se ha editado exitosamente');
                return res.redirect(`/detalle/${req.params.idProduct}`)
            })
        })
        .catch((err) => {
            console.error('Ha ocurrido un error modificando el producto: ' , err);
            res.status(500).send('Ha ocurrido un error al editar el producto. Por favor, inténtalo de nuevo.', err);
        })

    },  

    eliminarProducto: (req,res) => {
        
        db.Productos.findOne({
            where: {
                Id: req.params.idProduct
            }
        })
        .then((productFound) => {
            // Construye la ruta del archivo de la foto anterior
            let joinPath = join(__dirname, '../../public')
            let fotoProductoPrincipal = productFound.ImagenPrincipal
            let fotoProductoDos = productFound.ImagenDos
            let fotoProductoTres = productFound.ImagenTres

            try {
                fs.promises.unlink(joinPath + fotoProductoPrincipal)
                fs.promises.unlink(joinPath + fotoProductoDos)
                fs.promises.unlink(joinPath + fotoProductoTres)
            
                db.Productos.destroy({
                    where: {
                        Id: req.params.idProduct
                    }
                })
                .then((productoEliminado) => {
                    console.log('Producto eliminado exitosamente');
                    return res.redirect("/");
                })

            } catch(err) {
                console.error('Ha ocurrido un error eliminando el producto');
                res.status(500).send('Ha ocurrido un error al eliminar el producto. Por favor, inténtalo de nuevo.', err);
            }

        })

    },

    editarCategoria: async (req, res) => {
        let idCategoria = req.params.idCategory;
    
        try {
            const categoriaEncontrada = await db.Categorias.findOne({
                where: {
                    Id: idCategoria
                }
            });
    
            if (!categoriaEncontrada) {
                return res.status(404).send('Categoría no encontrada');
            }
    
            // Construye la ruta del archivo de la foto de categoría
            let joinPath = join(__dirname, '../../public');
    
            let imagenAnterior = categoriaEncontrada.ImgBanner;
            let nombreAnterior = categoriaEncontrada.Name;

            if(req.file) {
                try {
                    // Elimina la foto de la categoría
                    await fs.promises.unlink(joinPath + imagenAnterior);
                    console.log('Imagen anterior eliminada con éxito');
                } catch (err) {
                    console.error('Ha ocurrido un error eliminando la imagen anterior de categoría', err);
                }
            }
    
            await db.Categorias.update(
                {
                    Name: req.body.categoryName !== '' ? req.body.categoryName : nombreAnterior,
                    ImgBanner: req.file ? '/images/' + req.file.filename : imagenAnterior,
                },
                {
                    where: {
                        Id: idCategoria
                    }
                }
            ).then((categoriaEditada) => {
                console.log('Categoria modificada exitosamente');
                return res.redirect(`/productos/${req.params.idCategory}`);
            })
    
            
        } catch (error) {
            console.error('Error en la función editarCategoria', error);
            return res.status(500).send('Error interno del servidor');
        }
    },

    eliminarCategoria: (req,res) => {

        db.Categorias.findOne({
            where: {
                Id: req.params.idCategory
            }
        })
        .then(async (categoryFound) => {
            try {
                // Construye la ruta del archivo de la foto de categoría
                let joinPath = join(__dirname, '../../public');
                let imagenCategoria = categoryFound.ImgBanner;
    
                let productsWSameCategory = await db.Productos.findAll({
                    where: {
                        Categoria: req.params.idCategory
                    }
                });
    
                await productsWSameCategory.forEach(product => {
                    let imagenPrincipal = product.ImagenPrincipal;
                    let imagenDos = product.ImagenDos;
                    let imagenTres = product.ImagenTres;
    
                    try {
                        // Elimina las fotos del producto asociado a esa categoría
                        fs.promises.unlink(joinPath + imagenPrincipal);
                        fs.promises.unlink(joinPath + imagenDos);
                        fs.promises.unlink(joinPath + imagenTres);
                    } catch (err) {
                        console.error('Ha ocurrido un error eliminando las imágenes del producto: ' + product + ' y el error es: ', err);
                    }
    
                });
    
                await db.Productos.destroy({
                    where: {
                        Categoria: req.params.idCategory
                    }
                });
    
                await db.Categorias.destroy({
                    where: {
                        Id: req.params.idCategory
                    }
                });
    
                try {
                    // Elimina la foto de la categoría
                    fs.promises.unlink(joinPath + imagenCategoria);
                } catch (err) {
                    console.error('Ha ocurrido un error al eliminar la categoría', err);
                }
    
                console.log('Categoría eliminada');
                return res.redirect("/");
            } catch (error) {
                console.error('Ha ocurrido un error en el proceso de eliminación de categoría', error);
                return res.status(500).send('Error interno del servidor al eliminar la categoría',error);
            }
        });
        
    },

    eliminarAroma: async (req,res) =>{
        //console.log(req.body);
        
        try {
            db.Esencias.destroy({
                where: {
                    Id: Number(req.body.aroma)
                }
            }).then((aromaEliminado) => {
                console.log('Aroma Eliminado');
                res.redirect('/funcionesAdministrador')
            })
        } catch(err) {
            console.error('Ha ocurrido un error eliminando un aroma y el error es: ', err);
        }

        

    },  

    crearNuevoProducto:  (req,res) => {

        //console.log(req.files);
 
        try {

            db.Productos.create({
                Name: req.body.name,
                Descripcion: req.body.descripcion,
                Presentacion: req.body.presentacion,
                Precio: req.body.precio,
                Categoria: req.body.categoria,
                ImagenPrincipal: '/images/' + req.files.imagenPrincipal[0].filename,
                ImagenDos: '/images/' + req.files.imagenDos[0].filename,
                ImagenTres: '/images/' + req.files.imagenTres[0].filename 
            }).then((productoCreado) => {
                console.log(`El producto ${req.body.name} se ha creado exitosamente`);
                // Redirige después de crear el nuevo producto

                res.redirect('/funcionesAdministrador');
            })
            
            
        } catch (err) {
            console.error('Ha ocurrido un error al crear el nuevo producto', err);
            // Maneja el error de alguna manera, por ejemplo, enviando una respuesta de error al cliente
            return res.status(500).send('Error al crear el nuevo producto', err);
        }
    
        
    },

    crearNuevaCategoria: (req,res) => {

        try {

            db.Categorias.create({
                Name: req.body.categoryName,
                ImgBanner: '/images/' + req.file.filename
            }).then((categoriaCreada) => {
                console.log(`La categoria ${req.body.categoryName} se ha creado exitosamente`);
                res.redirect('/funcionesAdministrador')
            })
            
            

        } catch (err) {
            console.error('Ha ocurrido un error al crear la nueva categoria', err)
            res.status(500).send('Ha ocurrido un error al crear la nueva categoria. Por favor, inténtalo de nuevo.', err);
        }

        
    },

    crearNuevaFragancia: (req,res) => {
        //console.log(req.body);

        try {

            db.Esencias.create({
                Name:  req.body.nombreFragancia
            }).then((aromaCreado) => {
                console.log(`El aroma ${req.body.nombreFragancia} se ha creado exitosamente`);
                res.redirect('/funcionesAdministrador')
            })


        } catch(err) {
            console.error('Ha ocurrido un error al crear la nueva fragancia', err)
            res.status(500).send('Ha ocurrido un error al crear la nueva fragancia. Por favor, inténtalo de nuevo.', err);
        }

    }
}

module.exports = controller