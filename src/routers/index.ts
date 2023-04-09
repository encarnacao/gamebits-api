import { Router } from "express";
import userRouter from "./userRouters.js";

const router = Router();

router.use("/users", userRouter);

export default router;
