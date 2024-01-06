module.exports = function(sequelize, DataTypes){
    let alias = "Esencias";
    let cols = {
        Id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        Name: {
            type:DataTypes.STRING(60),
            allowNull: false
        }
    };

let config = {
    timestamps: false,
    tableName: 'esencias'
};
const Esencias = sequelize.define(alias, cols, config);

return Esencias;

}

