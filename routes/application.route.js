import express from 'express';
const router = express.Router();
import {applyJob, getAppliedJobs} from '../controllers/application.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.post('/apply/:jobId', isAuthenticated, applyJob);
router.get('/applied', isAuthenticated, getAppliedJobs);

export default router;