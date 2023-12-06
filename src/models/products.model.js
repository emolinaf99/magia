// TODO para encontrar o crear un producto

const fs = require('fs');

const Product = {
    FileName:'./src/data/products.json',
    
    all: function(){
        return JSON.parse(fs.readFileSync(Product.FileName, 'utf-8'));
    },
    generateId: function(){
        let allProducts = Product.all();
        let lastProduct = allProducts.pop();

        if(lastProduct){
            return lastProduct.id + 1;
        }
        return 1
    },
    findByPk: function(id){
        let allProducts = Product.all();
       let productFound= allProducts.find(e => e.id === id);
       return productFound
    },
    findByField: function(field, text){
        let allProducts = Product.all();
        let productFound = allProducts.find(e => e[field] === text);
        return productFound
    },
    create: function(ProductData) {
        let allProducts = Product.all();
        let newProduct = {
            id: Product.generateId(),
            name: ProductData.name,
            descripcion: ProductData.descripcion,
            presentacion: ProductData.presentacion,
            precio: ProductData.precio,
            categoria: ProductData.categoria,
            imagenPrincipal: ProductData.imagenPrincipal,
            imagenDos: ProductData.imagenDos,
            imagenTres: ProductData.imagenTres
            
        }
        allProducts.push(newProduct);
        fs.writeFileSync(Product.FileName, JSON.stringify(allProducts, null, ' '))
        return newProduct;
    },

    
}

module.exports = Product; 
