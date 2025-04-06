import express from 'express';
const router = express.Router();
import {applyJob} from '../controllers/application.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.post('/apply/:jobId', isAuthenticated, applyJob);

export default router;