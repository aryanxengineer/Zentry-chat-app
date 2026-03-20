import { Router } from 'express';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { validateRegisterData } from './auth.validator.js';
import { AuthRepository } from './auth.repository.js';

const authRouter = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// Define auth-related routes here
authRouter.post('/register', validateRegisterData, authController.register);

export default authRouter;