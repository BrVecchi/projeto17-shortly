import { Router } from "express";
import { deleteUrl, findUrlById, postUrl, redirectUrl } from "../controllers/urlsController.js";
import { tokenMiddleware } from "../middlewares/tokenValidationMiddleware.js";
import { urlSchemaValidation } from "../middlewares/urlSchemaMiddleware.js";
import { urlValidationMiddleware } from "../middlewares/urlValidationMiddleware.js";

export const urlsRouter = Router();

urlsRouter.post("/urls/shorten", tokenMiddleware, urlSchemaValidation, postUrl);
urlsRouter.get("/urls/:id", findUrlById);
urlsRouter.get("/urls/open/:shortUrl", redirectUrl);
urlsRouter.delete("/urls/:id",tokenMiddleware, urlValidationMiddleware, deleteUrl);