import express from 'express';
const router = express.Router();
import { postJob } from '../controllers/jog.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.post('/create', isAuthenticated, postJob);

export default router;