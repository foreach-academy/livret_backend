const Sequelize = require("sequelize");
const config = require('./config.js');
console.log(config.database)
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host : config.host,
    dialect : 'mysql',
    port : config.port
})

module.exports = sequelize;