import { Router } from "express";
import reviewRouter from "./reviewRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use("/users", userRouter);
router.use("/reviews", reviewRouter);

export default router;
