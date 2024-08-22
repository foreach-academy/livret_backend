const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/Sequelize');

class EvaluationType extends Model{

}

EvaluationType.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    sequelize,
    tableName: 'evaluation_type',
    modelName: 'EvaluationType',
    timestamps: false
});

module.exports = EvaluationType;