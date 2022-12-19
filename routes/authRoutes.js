import { Router } from "express";
import { signIn } from "../controllers/singInController.js";
import { signUp } from "../controllers/singUpController.js";
import { emailValidationMiddleware } from "../middlewares/emailValidationMiddleware.js";
import { passwordValidationMiddleware } from "../middlewares/passwordValidationMiddleware.js";
import { signInSchemaValidation } from "../middlewares/signInSchemaMiddleware.js";
import { userSchemaValidation } from "../middlewares/userSchemaMiddleware.js";
import { userValidationMiddleware } from "../middlewares/userValidationMiddleware.js";


export const authRouter = Router();

authRouter.post("/signup",userSchemaValidation, emailValidationMiddleware, signUp);
authRouter.post("/signin",signInSchemaValidation, userValidationMiddleware, passwordValidationMiddleware, signIn);



