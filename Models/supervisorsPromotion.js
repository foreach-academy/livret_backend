import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';
import User from './user.js';
import Promotion from './promotion.js';

class SupervisorsPromotion extends Model {}

SupervisorsPromotion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    supervisor_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ajout de NOT NULL
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    promotion_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ajout de NOT NULL
        references: {
            model: Promotion,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    sequelize,
    modelName: 'SupervisorsPromotion',
    tableName: 'supervisors_promotion',
    timestamps: false
});

export default SupervisorsPromotion;
