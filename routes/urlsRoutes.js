import { Router } from "express";
import { postUrl } from "../controllers/urlsController.js";
import { tokenMiddleware } from "../middlewares/tokenValidationMiddleware.js";

export const urlsRouter = Router();

urlsRouter.post("/urls/shorten", tokenMiddleware, postUrl);