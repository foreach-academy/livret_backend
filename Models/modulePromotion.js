import { Model, DataTypes } from "sequelize";
import Evaluation from "./evaluation.js";
import sequelize from '../config/Sequelize.js';
import TrainersPromotion from "./trainersPromotion.js";
import Promotion from "./promotion.js";
import Module from "./module.js";
import User from "./user.js";


class ModulePromotion extends Model {}

ModulePromotion.init(
    {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },

        trainer_id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User, 
                key: 'id',
            }
        },

        promotion_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Promotion,
                key: 'id',
            }
        },

        module_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Module,
                key: 'id',
            }
        },

        evaluation_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Evaluation,
                key: 'id',
            }
        },

        start_date: {
            type: DataTypes.DATE,
            allowNull: true
        },

        end_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    
    }, 
    {
        sequelize, 
        modelName: 'ModulePromotion',
        tableName: 'module_promotion',
        timestamps: false
    }
);

ModulePromotion.belongsTo(TrainersPromotion, { 
    foreignKey: 'trainer_id', 
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE' 
});

ModulePromotion.belongsTo(Promotion, { 
    foreignKey: 'promotion_id', 
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE' 
});

ModulePromotion.belongsTo(Module, { 
    foreignKey: 'module_id', 
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE' 
});

ModulePromotion.belongsTo(Evaluation, { 
    foreignKey: 'evaluation_id', 
    onDelete: 'SET NULL', 
    onUpdate: 'CASCADE' 
});

export default ModulePromotion;
