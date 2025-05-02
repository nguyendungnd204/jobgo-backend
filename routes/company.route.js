import express from 'express';
const router = express.Router();   
import {registerCompany, getAllCompanies, getCompanyById, updateCompany} from '../controllers/company.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';

router.post('/create',isAuthenticated, registerCompany);
router.get('/get',isAuthenticated, getAllCompanies);
router.get('/get/:id',isAuthenticated, getCompanyById);
router.put('/update/:id', isAuthenticated, singleUpload, updateCompany);
export default router;