const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/Sequelize');
const Module = require('./module');
const User = require('./user');
const EvaluationType = require('./evaluation_type');

class Evaluation extends Model{

}


Evaluation.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    module_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: Module,
            key: 'id'
        }
    },

    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: User,
            key: 'id'
        }
    },

    evaluation_type_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: "EvaluationType",
            key: 'id'
        }
    }
},{
    sequelize,
    tableName: 'evaluation',
    modelName: 'Evaluation',
    timestamps: false
});

Evaluation.belongsTo(EvaluationType, {as: 'evaluationType', foreignKey: 'evaluation_type_id'});
Evaluation.belongsTo(Module, {foreignKey: 'module_id'});
Evaluation.belongsTo(User, {foreignKey: 'user_id'});

module.exports = Evaluation;