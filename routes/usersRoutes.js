import { Router } from "express";
import { getUser } from "../controllers/usersController.js";
import { tokenMiddleware } from "../middlewares/tokenValidationMiddleware.js";


export const usersRouter = Router();

usersRouter.get("/users/me",tokenMiddleware, getUser);