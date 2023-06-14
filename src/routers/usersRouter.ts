import { Router } from "express";
import { validateBody } from "../middlewares/validateSchema.js";
import { userSchema, userSignInSchema } from "../schemas/userSchema.js";
import userMiddleware from "../middlewares/userMiddleware.js";
import { createUser, signIn } from "@/controllers/userController.js";

const usersRouter = Router();
usersRouter.post(
  "/signup",
  validateBody(userSchema),
  userMiddleware.checkConflict,
  createUser
);

usersRouter.post("/signin", validateBody(userSignInSchema), signIn);


export default usersRouter;
