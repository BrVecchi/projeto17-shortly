import { Router } from "express";
import { getRanking } from "../controllers/rankController.js";

export const rankingRouter = Router();

rankingRouter.get("/ranking", getRanking);