import express from 'express';
const router = express.Router();
import {applyJob, getAppliedJobs, getApplicants, updateStatus} from '../controllers/application.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.get('/apply/:jobId', isAuthenticated, applyJob);
router.get('/get', isAuthenticated, getAppliedJobs);
router.get('/:id/applicants', isAuthenticated, getApplicants);
router.patch('/status/:id/update', isAuthenticated, updateStatus);


export default router;