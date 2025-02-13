import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/Sequelize.js';
import Training from './training.js';
import Module from './module.js';
import User from './user.js';

class TrainingModule extends Model {}

TrainingModule.init(
    {
        trainer_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: User,
                key: "id",
            },
        },
        training_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Training,
                key: 'id', 
            },
            primaryKey: true, 
        },
        module_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Module,
                key: 'id', 
            },
            primaryKey: true, 
        },
    },
    {
        sequelize,
        modelName: 'TrainingModule',
        tableName: 'training_module',
        timestamps: false,
        primaryKey: false, 
    }
);

// Définition des relations
TrainingModule.belongsTo(User, { foreignKey: 'trainer_id', as: 'trainer' });
TrainingModule.belongsTo(Training, { foreignKey: 'training_id', as: 'training' });
TrainingModule.belongsTo(Module, { foreignKey: 'module_id', as: 'module' });

export default TrainingModule;
