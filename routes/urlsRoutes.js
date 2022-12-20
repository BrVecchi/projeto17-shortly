import { Router } from "express";
import { findUrlById, postUrl, redirectUrl } from "../controllers/urlsController.js";
import { tokenMiddleware } from "../middlewares/tokenValidationMiddleware.js";
import { urlSchemaValidation } from "../middlewares/urlSchemaMiddleware.js";

export const urlsRouter = Router();

urlsRouter.post("/urls/shorten", tokenMiddleware, urlSchemaValidation, postUrl);
urlsRouter.get("/urls/:id", findUrlById);
urlsRouter.get("/urls/open/:shortUrl", redirectUrl);

