const Formation = require('../Models/formation');
const Module =require('../Models/module');
const User = require('../Models/user');
const sequelize = require('../config/Sequelize')


class ModuleService{
    async getAllModule(){
        return await Module.findAll();
    }

    async getModuleById(moduleId){
        return await Module.findByPk(moduleId, {include:[{model:User, as: 'user'}, Formation]});
    }

    async addModule(moduleData){
        return await Module.create(moduleData, {include: [{model: User, as: 'user'}]});
    }


    async getModuleDetails() {
        console.log('le script est ici')
        const query = `
            SELECT module.title, mark.result, mark.updated_at, evaluation_type.name AS evaluation_type, module.commentary, user.promo,
            mark.created_at
            FROM mark
            JOIN module ON mark.module_id = module.id
            JOIN user ON mark.user_id = user.id
            JOIN role ON user.role_id = role.id
            LEFT JOIN evaluation ON mark.evaluation_id = evaluation.id
            LEFT JOIN evaluation_type ON evaluation.evaluation_type_id = evaluation_type.id
            WHERE role.name = 'Apprenant';

        `;
        
        try {
            const results = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
            console.log('Query results:', results); // Ajoutez ce log pour vérifier les résultats
            return results;
        } catch (error) {
            console.error('SQL query error:', error);
            throw error;
        }
    }
    
};



module.exports = new ModuleService();