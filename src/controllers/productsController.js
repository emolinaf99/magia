const products = require("../models/products.model"); 
const categories = require("../models/categories.model"); 
const scentses = require("../models/scents.model"); 

const {unlinkSync} = require('fs');
const {resolve,path,join} = require('path');
const fs = require('fs'); // acceder a archivos

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
    },

    editarProducto: (req,res) => {
        // console.log(req.body);
        // console.log(req.files);
        
       
        let productos = products.all()

        let array = []

        productos.forEach(producto => {
            if(producto.id == req.params.idProducto) {

                let imagenPrincipalAnterior = producto.imagenPrincipal
                let imagenDosAnterior = producto.imagenDos
                let imagenTresAnterior = producto.imagenTres

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


                let data = {
                    ...producto,
                    name: req.body.name,
                    categoria: req.body.categoria,
                    descripcion: req.body.descripcion,
                    presentacion: req.body.presentacion,
                    precio: req.body.precio,
                    imagenPrincipal: req.files.imagenPrincipal ? '/images/' + req.files.imagenPrincipal[0].filename : imagenPrincipalAnterior,
                    imagenDos: req.files.imagenDos ? '/images/' + req.files.imagenDos[0].filename : imagenDosAnterior,
                    imagenTres: req.files.imagenTres ? '/images/' + req.files.imagenTres[0].filename : imagenTresAnterior,
                }

                array.push(data)
            } else {
                array.push(producto)
            }
        })

        try {
            // Escribe la información actualizada en un archivo (por ejemplo, si paginaPrincipalInfo.FileName es una ruta válida)
            fs.writeFileSync(products.FileName, JSON.stringify(array, null, ' '))
            // Reescribe la información anterior con la nueva en un archivo
        }catch(err) {
            console.error('Ha ocurrido un error guardando cambios en productos: ',err)
        }
        

        return res.redirect(`/detalle/${req.params.idProducto}`)

    },  

    eliminarProducto: (req,res) => {
        let allProducts = products.all()
        let productFound = allProducts.find(e => e.id == req.params.idProduct)

        // Construye la ruta del archivo de la foto anterior
        let joinPath = join(__dirname, '../../public')
        let fotoProductoPrincipal = productFound.imagenPrincipal
        let fotoProductoDos = productFound.imagenDos
        let fotoProductoTres = productFound.imagenTres

        try {
            fs.promises.unlink(joinPath + fotoProductoPrincipal)
            fs.promises.unlink(joinPath + fotoProductoDos)
            fs.promises.unlink(joinPath + fotoProductoTres)
        
            let finalProducts = allProducts.filter(e => e.id != req.params.idProduct)
            fs.writeFileSync(products.FileName, JSON.stringify(finalProducts, null, ' '));
        } catch(err) {
            console.error('Ha ocurrido un error eliminando el producto');
        }

        return res.redirect("/");
    },

    editarCategoria: (req,res) => {
        let idCategoria = req.params.idCategory
        let allCategories = categories.all();
        let array = []

        console.log(req.body);

        allCategories.forEach(category => {
            if(category.id == idCategoria) {
                // Construye la ruta del archivo de la foto de categoria
                let joinPath = join(__dirname, '../../public')

                let imagenAnterior = category.imgBanner
                let nombreAnterior = category.name

                try {
                    // elimina la foto de la categoria
                    fs.promises.unlink(joinPath + imagenAnterior)
                } catch(err) {
                    console.error('Ha ocurrido un error eliminando la imagen anterior de categoria',err);
                }

                let data = {
                    ...category,
                    name: req.body.categoryName != '' ? req.body.categoryName : nombreAnterior,
                    imgBanner: req.file ? '/images/' + req.file.filename : imagenAnterior
                }

                array.push(data)
            } else {
                array.push(category)
            }
        })

        try {
            // Escribe la información actualizada en un archivo (por ejemplo, si paginaPrincipalInfo.FileName es una ruta válida)
            fs.writeFileSync( categories.FileName, JSON.stringify(array, null, ' '))
            // Reescribe la información anterior con la nueva en un archivo
        }catch(err) {
            console.error('Ha ocurrido un error guardando cambios en categorias: ',err)
        }

        return res.redirect(`/productos/${req.params.idCategory}`)
    },

    eliminarCategoria: (req,res) => {
        let allCategories = categories.all()
        let categoryFound = allCategories.find(e => e.id == req.params.idCategory)

        // Construye la ruta del archivo de la foto de categoria
        let joinPath = join(__dirname, '../../public')
        let imagenCategoria = categoryFound.imgBanner
        
        let allProducts = products.all()
        let productsWSameCategory = allProducts.filter(e => e.categoria == req.params.idCategory)

        productsWSameCategory.forEach(product => {
            let imagenPrincipal = product.imagenPrincipal
            let imagenDos = product.imagenDos
            let imagenTres = product.imagenTres

            try {
                // elimina las fotos del producto asociado a esa categoria
                fs.promises.unlink(joinPath + imagenPrincipal)
                fs.promises.unlink(joinPath + imagenDos)
                fs.promises.unlink(joinPath + imagenTres)
            } catch(err) {
                console.error('Ha ocurrido un error con eliminando las imagenes del producto:'+ product + ' y el error es: ', err);
            }

            try {
                // realiza cambios en JSON
                let newListProducts = allProducts.filter(e => e.categoria != req.params.idCategory)
                fs.writeFileSync(products.FileName, JSON.stringify(newListProducts, null, ' '));
            } catch(err) {
                console.error('Ha ocurrido un error realizando cambios en la tabla productos y el error es: ', err);
            }
            
        })

        try {
            // elimina la foto de la categoria
            fs.promises.unlink(joinPath + imagenCategoria)

            // realiza cambios en JSON
            let finalCategories = allCategories.filter(e => e.id != req.params.idCategory)
            fs.writeFileSync(categories.FileName, JSON.stringify(finalCategories, null, ' '));
        }catch (err) {
            console.error('Ha ocurrido un error al eliminar la categoria', err);
        }

        return res.redirect("/");
    },

    eliminarAroma: (req,res) =>{
        console.log(req.body);
        let todosLosAromas = scentses.all()

        try {
            // realiza cambios en JSON
            let newListScents = todosLosAromas.filter(e => e.id != Number(req.body.aroma))

            fs.writeFileSync(scentses.FileName, JSON.stringify(newListScents, null, ' '));
        } catch(err) {
            console.error('Ha ocurrido un error eliminando un aroma y el error es: ', err);
        }

        res.redirect('/funcionesAdministrador')

    },  

    crearNuevoProducto:  (req,res) => {

        //console.log(req.files);
 
        try {
            let newProduct = {
                name: req.body.name,
                descripcion: req.body.descripcion,
                presentacion: req.body.presentacion,
                precio: req.body.precio,
                categoria: req.body.categoria,
                imagenPrincipal: '/images/' + req.files.imagenPrincipal[0].filename,
                imagenDos: '/images/' + req.files.imagenDos[0].filename,
                imagenTres: '/images/' + req.files.imagenTres[0].filename 
            };
    
            // Asegúrate de manejar correctamente las operaciones asíncronas (dependiendo de cómo esté implementado products.create)
            products.create(newProduct);
        } catch (err) {
            console.error('Ha ocurrido un error al crear el nuevo producto', err);
            // Maneja el error de alguna manera, por ejemplo, enviando una respuesta de error al cliente
            return res.status(500).send('Error al crear el nuevo producto');
        }
    
        // Redirige después de crear el nuevo producto
        res.redirect('/funcionesAdministrador');
    },

    crearNuevaCategoria: (req,res) => {

        try {

            let newCategory = {
                categoryName: req.body.categoryName,
                imgBanner: '/images/' + req.file.filename
            }
            
            categories.create(newCategory)

        } catch (err) {
            console.error('Ha ocurrido un error al crear la nueva categoria', err)
        }
        

        res.redirect('/funcionesAdministrador')
    },

    crearNuevaFragancia: (req,res) => {
        //console.log(req.body);

        try {

            let scentToCreate = {
                nombreFragancia: req.body.nombreFragancia
            }
            
            scentses.create(scentToCreate)

        } catch(err) {
            console.error('Ha ocurrido un error al crear la nueva fragancia', err)
        }

        res.redirect('/funcionesAdministrador')
    }
}

module.exports = controller