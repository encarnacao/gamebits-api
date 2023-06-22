import { Router } from "express";
import { validateBody, validateQuery } from "../middlewares/validateSchema";
import {
  userQuerySchema,
  userSchema,
  userSignInSchema,
} from "../schemas/userSchemas";
import userMiddleware from "@/middlewares/userMiddleware";
import {
  createUser,
  findAllUsers,
  findUsername,
  findUsers,
  getMe,
  signIn,
} from "@/controllers/userController";
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
  .get("/search", validateQuery(userQuerySchema), findUsers)
  .get("/all", findAllUsers)
  .get("/me", validateCredentials, getMe)
  .get("/u/:username", userMiddleware.checkUserCredentials, findUsername);

export default usersRouter;
