const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/Sequelize');

// class Role extends Model{

// }

// Role.init({
//     id:{
//         type:DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },

//     name:{
//         type: DataTypes.STRING,
//         allowNull: false
//     },

// },{
//     sequelize,
//     modelName: "Role",
//     tableName: "role",
//     timestamps: false
// });

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
        sequelize,
        modelName: "Role",
        tableName: "role",
        timestamps: false
    });


module.exports = Role;