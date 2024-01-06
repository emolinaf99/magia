module.exports = function(sequelize, DataTypes){
    let alias = "Productos";
    let cols = {
        Id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        Name:{
            type: DataTypes.STRING(40),
            allowNull: false
        },
        Descripcion:{
            type: DataTypes.STRING(200),
            allowNull: false
        },
        Presentacion:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        Precio:{
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        Categoria:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ImagenPrincipal:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        ImagenDos:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        ImagenTres:{
            type: DataTypes.STRING(100),
            allowNull: false
        },

    };
let config = {
    freezeTableName: true, //FreezeTableName No agrega "s" al final de la tabla
    timestamps: false,
    tableName: 'productos'
};
const Productos = sequelize.define(alias, cols, config);

Productos.associate = function(models){
    Productos.belongsTo(models.Categorias, {
        as: "Producto_Categoria",
        foreignKey: "Id"
    })
}

return Productos;
}

