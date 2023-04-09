import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import userController from "../controllers/userController.js";
import { userSchema } from "../schemas/userSchema.js";

const userRouter = Router();
userRouter.post("/signup", validateSchema(userSchema), userController.createUser);

export default userRouter;
