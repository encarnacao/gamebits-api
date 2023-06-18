import { Router } from "express";
import { validateBody, validateParams } from "../middlewares/validateSchema";
import { userSchema, userSignInSchema } from "../schemas/userSchemas";
import userMiddleware from "@/middlewares/userMiddleware";
import { createUser, findUser, signIn } from "@/controllers/userController";
import { paramsSchema } from "@/schemas/genericSchemas";

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
