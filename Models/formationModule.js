import { Model, DataTypes} from 'sequelize';
import sequelize from '../config/Sequelize.js';
import Training from './training.js';
import Module from './module.js';
import User from './user.js';

class TrainingModule extends Model{

}

TrainingModule.init({
    start_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    trainer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    training_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: Training,
            key: 'training_id'
        }
    },

    module_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model: Module,
            key: 'module_id'
        }
    }


},{
    sequelize,
    modelName: 'Training_Module',
    tableName: 'training_module',
    timestamps: false
});

TrainingModule.belongsTo(User, {foreignKey: 'trainer_id', as: 'trainer'})

export default TrainingModule;