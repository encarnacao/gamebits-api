import { Router } from "express";
import commentRouter from "./commentRouter.js";
import reviewRouter from "./reviewRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use("/users", userRouter);
router.use("/reviews", reviewRouter);
router.use("/comments", commentRouter);

export default router;
