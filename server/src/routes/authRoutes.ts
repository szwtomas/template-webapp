import express from "express";
import {AuthController} from "../auth/AuthController";

export const provideAuthRouter = (authController: AuthController): express.Router => {
    const authRouter = express.Router();
    authRouter.post("/signUp", authController.signUp.bind(authController));
    return authRouter;
}
