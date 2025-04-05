import express from 'express';
const router = express.Router();   
import {registerCompany} from '../controllers/company.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.post('/create',isAuthenticated, registerCompany);

export default router;