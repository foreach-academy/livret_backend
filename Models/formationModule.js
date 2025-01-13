import { Model, DataTypes} from 'sequelize';
import sequelize from '../config/Sequelize.js';
import Formation from './formation.js';
import Module from './module.js';

class FormationModule extends Model{

}

FormationModule.init({
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

export default FormationModule;