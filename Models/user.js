const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/Sequelize');
const bcrypt = require('bcrypt');
const Role = require("./role");

class User extends Model {
    async validateMdp(password) {
        return await bcrypt.compare(password, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    promo: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Role",
            key: "id"
        }
    },
    company: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(200),
        // unique: true,
        allowNull: false
    },
    // Ajout des champs pour la réinitialisation de mot de passe
    resetPasswordToken: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true // Ce champ est null tant qu'il n'y a pas de demande de réinitialisation
    },

    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true // Ce champ est null tant qu'il n'y a pas de demande de réinitialisation
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: false,
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        }
    }
});

User.belongsTo(Role, {as: "role",  foreignKey: "role_id" });

module.exports = User;
