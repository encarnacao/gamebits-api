import { Router } from "express";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middlewares/validateSchema";
import {
  userQuerySchema,
  userSchema,
  userSignInSchema,
} from "../schemas/userSchemas";
import userMiddleware from "@/middlewares/userMiddleware";
import {
  createUser,
  findAllUsers,
  findUser,
  findUsername,
  findUsers,
  getMe,
  signIn,
} from "@/controllers/userController";
import { paramsSchema } from "@/schemas/genericSchemas";
import validateCredentials from "@/middlewares/authMiddleware";

const usersRouter = Router();
usersRouter
  .post(
    "/signup",
    validateBody(userSchema),
    userMiddleware.checkConflict,
    createUser
  )
  .post("/signin", validateBody(userSignInSchema), signIn)
  .get("/id/:id", validateParams(paramsSchema), findUser)
  .get("/search", validateQuery(userQuerySchema), findUsers)
  .get("/all", findAllUsers)
  .get("/me", validateCredentials, getMe)
  .get("/u/:username", findUsername);

export default usersRouter;
