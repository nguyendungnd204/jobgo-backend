import express from 'express';
const router = express.Router();
import { postJob, getAllJobs, getJobById, getAdminJobs } from '../controllers/jog.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.post('/create', isAuthenticated, postJob);
router.get('/get', isAuthenticated, getAllJobs);
router.get('/get/:id', isAuthenticated, getJobById);
router.get('/getadminjobs', isAuthenticated, getAdminJobs);
export default router;