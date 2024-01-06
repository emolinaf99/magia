module.exports = function(sequelize, DataTypes){
    let alias = "User";
    let cols = {
        Id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        User: {
            type:DataTypes.STRING(60),
            allowNull: false
        },
        Name: {
            type:DataTypes.STRING(20),
            allowNull: false
        },
        Password: {
            type:DataTypes.STRING(200),
            allowNull: false
        },
        Email: {
            type:DataTypes.STRING(100),
            allowNull: false
        }
    };

let config = {
    freezeTableName: true, 
    timestamps: false,
    tableName: 'adminuser'
};
const User = sequelize.define(alias, cols, config);


return User;

}

