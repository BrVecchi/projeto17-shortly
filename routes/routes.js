import { Router } from "express";
import { signIn } from "../controllers/singInController.js";
import { signUp } from "../controllers/singUpController.js";
import { userValidationMiddleware } from "../middlewares/userValidationMiddleware.js";

const router = Router();

router.post("/signup", signUp)
router.post("/signin",userValidationMiddleware, signIn)

export default router;