// TODO Encontrar o crear la informacion de un usuario

const fs = require('fs');

const User = {
    FileName:'./src/data/user.json',
    
    all: function(){
        return JSON.parse(fs.readFileSync(User.FileName, 'utf-8'));
    },
    generateId: function(){
        let allUsers = User.all();
        let lastUser = allUsers.pop();

        if(lastUser){
            return lastUser.id + 1;
        }

        return 1
    },
    findByPk: function(id){
       let allUsers = User.all();
       let userFound = allUsers.find(e => e.id === id);
       return userFound
    },
    findByEmail: function(email){
        let allUsers = User.all();
        let userFound = allUsers.find(e => e.email === email);
        return userFound
    },
    findByField: function(field, text){
        let allUsers = User.all();
        let userFound = allUsers.find(e => e[field] === text);
        return userFound
    }
   
    
}

module.exports = User; 
