// TODO para encontrar o generar una partida

const fs = require('fs');

const Scents = {
    FileName:'./src/data/scents.json',
    
    all: function(){
        return JSON.parse(fs.readFileSync(Scents.FileName, 'utf-8'));
    },
    generateId: function(){
        let allScentses = Scents.all();
        let lastScent = allScentses.pop();

        if(lastScent){
            return lastScent.id + 1;
        }
        return 1
    },
    findByPk: function(id){
        let allScentses = Scents.all();
       let ScentFound= allScentses.find(e => e.id === id);
       return ScentFound
    },
    findByField: function(field, text){
        let allScentses = Scents.all();
        let ScentFound = allScentses.find(e => e[field] === text);
        return ScentFound
    },
    create: function(ProductData) {
        let allScentses = Scents.all();
        let newScent = {
            id: Scents.generateId(),
            game: ProductData.game,
            img: ProductData.img
        }
        allScentses.push(newScent);
        fs.writeFileSync(Scents.FileName, JSON.stringify(allScentses, null, ' '))
        return newScent;
    },

    
}

module.exports = Scents; 
