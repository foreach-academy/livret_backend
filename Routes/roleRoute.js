import { Router } from 'express';
import roleController from '../controllers/roleController.js';

const router = Router();

router.get('/', (req, res) => roleController.getAllRole(req,res));
router.get('/:id', (req, res) => roleController.getRoleById(req, res));
router.post('/', (req, res) => roleController.addRole(req,res));
router.patch('/id', (req, res) => roleController.updateRole(req,res));
router.delete('/id', (req, res) => roleController.deleteRole(req,res));



export default router;