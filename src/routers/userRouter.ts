import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import userController from "../controllers/userController.js";
import { userSchema } from "../schemas/userSchema.js";
import userMiddleware from "../middlewares/userMiddleware.js";

const userRouter = Router();
userRouter.post(
	"/signup",
	validateSchema(userSchema),
	userMiddleware.checkConflict,
	userController.createUser
);

userRouter.post("/signin", userController.signIn);

export default userRouter;
