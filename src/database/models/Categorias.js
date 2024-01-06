module.exports = function(sequelize, DataTypes){
    let alias = "Categorias";
    let cols = {
        Id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        Name: {
            type:DataTypes.STRING(30),
            allowNull: false
        },
        ImgBanner: {
            type:DataTypes.STRING(200),
            allowNull: false
        }
    };

let config = {
    timestamps: false,
    tableName: 'categorias'
};
const Categorias = sequelize.define(alias, cols, config);

return Categorias;

}

