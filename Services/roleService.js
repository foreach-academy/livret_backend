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

    async updateRole(roles,ids){
        return await role.update(roles,{
            where : {
                id: ids
            }
        })
    }

    async deleteRole(ids){
        return await role.destroy({
            where : {
                id: ids
            }
        })
    }
};

module.exports = new RoleService();