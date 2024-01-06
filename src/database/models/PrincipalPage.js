module.exports = function(sequelize, DataTypes){
    let alias = "PrincipalPage";
    let cols = {
        Id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        ImagenBanner: {
            type:DataTypes.STRING(200),
            allowNull: false
        },
        TextoBanner: {
            type:DataTypes.STRING(600),
            allowNull: false
        }
    };

let config = {
    freezeTableName: true, //FreezeTableName No agrega "s" al final de la tabla
    timestamps: false,
    tableName: 'principalpage'
};
const paginaPrincipal = sequelize.define(alias, cols, config);

return paginaPrincipal;

}

