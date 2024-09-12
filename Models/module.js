const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/Sequelize')
const User = require('./user')


class Module extends Model{

}

Module.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    end_date:{
        type: DataTypes.DATE,
        allowNull: false
    },

    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: User,
            key: "user_id"
        }
    },

    commentary:{
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Module',
    tableName: 'module',
    timestamps: false
});

Module.belongsTo(User, {as: "user", foreignKey:'user_id'});


module.exports = Module;