const role = require('../Models/role');

class RoleService{
    async getAllRole(){
        return await role.findAll();
    }

    async getRoleById(roleId){
        return await role.findByPk(roleId);
    }

    async addRole(roleData){
        return await role.create(roleData);
    }
};

module.exports = new RoleService();