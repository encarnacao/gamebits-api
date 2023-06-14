import { Router } from "express";
import { validateBody } from "../middlewares/validateSchema.js";
import { userSchema, userSignInSchema } from "../schemas/userSchema.js";
import userMiddleware from "../middlewares/userMiddleware.js";
import { createUser, signIn } from "@/controllers/userController.js";

const userRouter = Router();
userRouter.post(
  "/signup",
  validateBody(userSchema),
  userMiddleware.checkConflict,
  createUser
);

userRouter.post("/signin", validateBody(userSignInSchema), signIn);

export default userRouter;
