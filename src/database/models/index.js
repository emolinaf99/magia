'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  //console.log(config.database, config.username, config.password);
  //console.log(env);
}

// sequelize.authenticate()
//   .then(() => {
//     console.log('Conexión a la base de datos establecida correctamente.');

//     // Consulta para obtener los nombres de todas las tablas en la base de datos
//     return sequelize.query("SHOW TABLES", { type: Sequelize.QueryTypes.SHOWTABLES });
//   })
//   .then(async (tables) => {
//     // Muestra los resultados en la consola
//     console.log('Nombres de todas las tablas:', tables);
  
//     // Realiza consultas SELECT para cada tabla
//     for (const tableInfo of tables) {
//       const tableName = tableInfo; // Obtén el nombre de la tabla
  
//       try {
//         // Consulta SELECT para cada tabla
//         const tableData = await sequelize.query(`SELECT * FROM \`${tableName}\``, { type: Sequelize.QueryTypes.SELECT });
//         console.log(`Contenido de la tabla ${tableName}:`, JSON.stringify(tableData, null, 2));
//       } catch (error) {
//         console.error(`Error al ejecutar SELECT en la tabla ${tableName}:`, error);
//       }
//     }
  
//     // Cierra la conexión a la base de datos
//     //sequelize.close();
//   })
//   .catch(error => {
//     console.error('Error al conectar a la base de datos:', error);
//     process.exit(1);
//   });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


