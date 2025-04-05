import express  from 'express';
const router = express.Router();
import { login, register, logout, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.post("/register", register);
router.post("/login", login);
router.post("/profile/update", isAuthenticated, updateProfile);
router.get("/logout", logout);

export default router;
