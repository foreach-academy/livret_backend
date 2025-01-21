import { Model, DataTypes} from 'sequelize';
import sequelize from '../config/Sequelize.js';
import Formation from './formation.js';
import Module from './module.js';
import User from './user.js';

class FormationModule extends Model{

}

FormationModule.init({
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
    formateur_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    formation_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: Formation,
            key: 'formation_id'
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
    modelName: 'Formation_Module',
    tableName: 'formation_module',
    timestamps: false
});

FormationModule.belongsTo(User, {foreignKey: 'formateur_id', as: 'formateur'})

export default FormationModule;