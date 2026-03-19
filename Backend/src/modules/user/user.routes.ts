import { Router } from 'express';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';

const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

// Define user-related routes here
userRouter.get('/me', userController.getUserMe);

export default userRouter;