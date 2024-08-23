const MarkControl = require('../Controllers/markController');

const express = require('express');

const router = express.Router();



router.get('/', (req, res) => MarkControl.getAllMark(req, res));
router.get('/:id', (req, res) => MarkControl.getMarkById(req, res));
router.post('/', (req, res) => MarkControl.addMark(req, res));


module.exports = router;