import { Router } from "express";
import { validateBody, validateParams } from "../middlewares/validateSchema.js";
import { userSchema, userSignInSchema } from "../schemas/userSchema.js";
import userMiddleware from "../middlewares/userMiddleware.js";
import { createUser, findUser, signIn } from "@/controllers/userController.js";
import { paramsSchema } from "@/schemas/genericSchemas.js";

const usersRouter = Router();
usersRouter
  .post(
    "/signup",
    validateBody(userSchema),
    userMiddleware.checkConflict,
    createUser
  )
  .post("/signin", validateBody(userSignInSchema), signIn)
  .get("/:id", validateParams(paramsSchema), findUser);

export default usersRouter;
