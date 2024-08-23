const Evaluation = require('../Models/evaluation');
const Mark = require('../Models/mark');
const Module = require('../Models/module');
const User = require('../Models/user');

class MarkServ{
    async getAllMark(){
        return await Mark.findAll({include:[User, Module, Evaluation]});
    }

    async getMakById(markId){
        return await Mark.findByPk(markId, {include:[User, Module, Evaluation]});
    }

    async addMark(markData){
        return await Mark.create(markData, {include:[User, Module, Evaluation]})
    }
};

module.exports = new MarkServ();