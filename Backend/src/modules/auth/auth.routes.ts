import { Router } from 'express';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';

const authRouter = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

// Define auth-related routes here
authRouter.post('/signup', authController.signUp);

export default authRouter;