import { Router } from "express";
import { signIn } from "../controllers/singInController.js";
import { signUp } from "../controllers/singUpController.js";
import { emailValidationMiddleware } from "../middlewares/emailValidationMiddleware.js";
import { passwordValidationMiddleware } from "../middlewares/passwordValidationMiddleware.js";
import { signInSchemaValidation } from "../middlewares/signInSchemaMiddleware.js";
import { userSchemaValidation } from "../middlewares/userSchemaMiddleware.js";
import { userValidationMiddleware } from "../middlewares/userValidationMiddleware.js";


const router = Router();

router.post("/signup",userSchemaValidation, emailValidationMiddleware, signUp);
router.post("/signin",signInSchemaValidation, userValidationMiddleware, passwordValidationMiddleware, signIn);

export default router;
