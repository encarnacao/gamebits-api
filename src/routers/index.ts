import { Router } from "express";
import userRouter from "./userRouter.js";
import gamesRouter from "./gamesRouter.js";

const router = Router();

router.use("/users", userRouter);
router.use("/games", gamesRouter);

export default router;
