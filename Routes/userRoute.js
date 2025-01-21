import { Router } from 'express';
const router = Router();

import userController from '../controllers/userController.js';
import authGuard from '../middleware/authGuard.js';

router.get('/',  (req, res) => userController.getAllUsers(req,res));
router.get('/:id', (req, res) => userController.getUserById(req,res));
router.post('/',  (req, res) => userController.addUser(req,res));
// ?
router.post('/reset-password', (req, res) => userController.updateUserByToken(req,res));
router.patch('/:id',  (req, res) => userController.updateUser(req, res));
router.delete('/:id',  (req, res) => userController.deleteUser(req, res));



export default router;