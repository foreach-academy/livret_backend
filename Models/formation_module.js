const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/Sequelize')
const Formation = require('./formation')
const Module = require('./module')

class Formation_Module extends Model{

}

Formation_Module.init({
    formation_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: Formation,
            key: 'formation_id'
        }
    },

    module_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model: Module,
            key: 'module_id'
        }
    }


},{
    sequelize,
    modelName: 'Formation_Module',
    tableName: 'formation_module',
    timestamps: false
});

module.exports = Formation_Module;