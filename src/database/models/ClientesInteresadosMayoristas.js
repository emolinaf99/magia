module.exports = function(sequelize, DataTypes){
    let alias = "ClientesInteresadosMayoristas";
    let cols = {
        Id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        Nombre: {
            type:DataTypes.STRING(50),
            allowNull: false
        },
        Pais: {
            type:DataTypes.STRING(60),
            allowNull: false
        },
        Ciudad: {
            type:DataTypes.STRING(60),
            allowNull: false
        },
        Numero: {
            type:DataTypes.STRING(20),
            allowNull: false
        },
        Correo: {
            type:DataTypes.STRING(30),
            allowNull: false
        },
        Mensaje: {
            type:DataTypes.STRING(100),
            allowNull: false
        }
    };

let config = {
    timestamps: false,
    tableName: 'clientesinteresadosmayoristas'
};
const clientesInteresadosMayoristas = sequelize.define(alias, cols, config);


return clientesInteresadosMayoristas;

}

