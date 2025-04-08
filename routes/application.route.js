import express from 'express';
const router = express.Router();
import {applyJob, getAppliedJobs, getApplicants, updateStatus} from '../controllers/application.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.post('/apply/:jobId', isAuthenticated, applyJob);
router.get('/applied', isAuthenticated, getAppliedJobs);
router.get('/:id/applicants', isAuthenticated, getApplicants);
router.patch('/status/:id/update', isAuthenticated, updateStatus);


export default router;