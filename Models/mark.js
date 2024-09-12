const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/Sequelize');
const User = require('./user');
const Module = require('./module');
const Evaluation = require('./evaluation');

class Mark extends Model{

}

Mark.init({
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: User,
            key: 'id'
        }
    },

    module_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: Module,
            key: 'id'
        }
    },

    evaluation_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: Evaluation,
            key: 'id'
        }
    },

    result:{
        type: DataTypes.ENUM('Acquis','En cours', 'Non acquis' ),
        allowNull: false
    },

},{
    sequelize,
    modelName: 'Mark',
    tableName: 'mark',
    timestamps: false
});

Mark.belongsTo(User, {foreignKey: 'user_id'});
Mark.belongsTo(Module, {foreignKey: 'module_id'});
Mark.belongsTo(Evaluation, {foreignKey:'evaluation_id'});


module.exports = Mark;