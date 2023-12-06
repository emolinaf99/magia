// TODO para encontrar o generar una partida

const fs = require('fs');

const Category = {
    FileName:'./src/data/categories.json',
    
    all: function(){
        return JSON.parse(fs.readFileSync(Category.FileName, 'utf-8'));
    },
    generateId: function(){
        let allCategories = Category.all();
        let lastCategory = allCategories.pop();

        if(lastCategory){
            return lastCategory.id + 1;
        }
        return 1
    },
    findByPk: function(id){
        let allCategories = Category.all();
       let categoryFound= allCategories.find(e => e.id === id);
       return categoryFound
    },
    findByField: function(field, text){
        let allCategories = Category.all();
        let categoryFound = allCategories.find(e => e[field] === text);
        return categoryFound
    },
    create: function(ProductData) {
        let allCategories = Category.all();
        let newCategory = {
            id: Category.generateId(),
            name: ProductData.categoryName,
            imgBanner: ProductData.imgBanner
        }
        allCategories.push(newCategory);
        fs.writeFileSync(Category.FileName, JSON.stringify(allCategories, null, ' '))
        return newCategory;
    },

    
}

module.exports = Category; 
