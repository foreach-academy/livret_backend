const MarkServ = require('../services/markService');

class MarkControl{
    async getAllMark(req, res){
        try{
            const mark = await MarkServ.getAllMark()
            res.json(mark)
        }catch(error){
            console.error('here is the issue', error)
            res.status(500).json({error: 'An error occured while getting all marks'});
        }
    }

    async getMarkById(req, res){
        try{
            const mark = await MarkServ.getMakById(req.params.id)
            res.json(mark)
        }catch(error){
            res.status(500).json({error: 'An error occured while getting mark'});
        }
    }

    async addMark(req, res){
        try{
            const mark = await MarkServ.addMark(req.body)
            res.json(mark)
        }catch(error){
            res.status(500).json({error: 'An error occured while adding mark'});
        }
    }
};

module.exports = new MarkControl();