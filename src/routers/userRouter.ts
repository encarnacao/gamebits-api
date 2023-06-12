import { Router } from "express";
import { validateBody } from "../middlewares/validateSchema.js";
import userController from "../controllers/userController.js";
import { userSchema } from "../schemas/userSchema.js";
import userMiddleware from "../middlewares/userMiddleware.js";

const userRouter = Router();
userRouter.post(
	"/signup",
	validateBody(userSchema),
	userMiddleware.checkConflict,
	userController.createUser
);

userRouter.post("/signin", userController.signIn);

export default userRouter;
