const { Model, DataTypes } = require("sequelize")
const sequelize = require('../config/Sequelize');
const Role =require('../Models/role')
class User extends Model{

}

User.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    first_name:{
        type: DataTypes.STRING,
        allowNull: false
    },

    surname:{
        type: DataTypes.STRING,
        allowNull: false
    },

    email:{
        type: DataTypes.STRING,
        allowNull: false
    },

    promo:{
        type: DataTypes.STRING,
        allowNull: false
    },

    created_at:{
        type: DataTypes.DATE
    },

    updated_at:{
        type: DataTypes.DATE
    },

    role_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: "Role",
            key: "id"
        }
    },

    company:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: false
});

User.belongsTo(Role, {as: "role",  foreignKey: "role_id" });

module.exports = User;