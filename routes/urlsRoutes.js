import { Router } from "express";
import { postUrl } from "../controllers/urlsController.js";
import { tokenMiddleware } from "../middlewares/tokenValidationMiddleware.js";
import { urlSchemaValidation } from "../middlewares/urlSchemaMiddleware.js";

export const urlsRouter = Router();

urlsRouter.post("/urls/shorten", tokenMiddleware, urlSchemaValidation, postUrl);