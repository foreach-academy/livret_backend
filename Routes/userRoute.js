import { Router } from 'express';
const router = Router();

import userController from '../controllers/userController.js';
import authGuard from '../middleware/authGuard.js';

router.get('/',  (req, res, next) => userController.getAllUsers(req,res, next));
router.get('/:id', (req, res, next) => userController.getUserById(req,res, next));
router.post('/',  (req, res, next) => userController.addUser(req,res, next));
router.patch('/:id',  (req, res, next) => userController.updateUser(req, res, next));
router.delete('/:id',  (req, res, next) => userController.deleteUser(req, res, next));
router.get('/role/:role', (req, res, next) => userController.getUserByRole(req, res, next));


export default router;