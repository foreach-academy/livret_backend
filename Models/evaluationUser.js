import { Model, DataTypes } from "sequelize";
import sequelize from '../config/Sequelize.js';
import User from './user.js';
import ModulePromotion from './modulePromotion.js';
import EvaluationResult from './evaluationResult.js';

class EvaluationUser extends Model {}

EvaluationUser.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    },
    module_promotion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ModulePromotion,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    result_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: EvaluationResult,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    commentary: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    sequelize,
    modelName: "EvaluationUser",
    tableName: "evaluation_user",
    timestamps: false
});

export default EvaluationUser;
