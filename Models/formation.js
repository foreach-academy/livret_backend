const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/Sequelize');
const User = require('./user');

class Formation extends Model{

}

Formation.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title:{
        type: DataTypes.STRING,
        allowNull: false
    },

    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: User,
            key: "id"
        }
    }

},{
    sequelize,
    modelName: 'Formation',
    tableName: 'formation',
    timestamps: false
});

Formation.belongsTo(User, {as: 'user', foreignKey:'user_id'});

module.exports = Formation;