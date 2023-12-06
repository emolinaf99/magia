// TODO para encontrar o generar una partida

const fs = require('fs');

const PrincipalPage = {
    FileName:'./src/data/principalPage.json',
    
    all: function(){
        return JSON.parse(fs.readFileSync(PrincipalPage.FileName, 'utf-8'));
    },
    generateId: function(){
        let allCategories = PrincipalPage.all();
        let lastCategory = allCategories.pop();

        if(lastCategory){
            return lastCategory.id + 1;
        }
        return 1
    },
    findByPk: function(id){
        let allCategories = PrincipalPage.all();
       let categoryFound= allCategories.find(e => e.id === id);
       return categoryFound
    },
    findByField: function(field, text){
        let allCategories = PrincipalPage.all();
        let categoryFound = allCategories.find(e => e[field] === text);
        return categoryFound
    },
    

    
}

module.exports = PrincipalPage; 
