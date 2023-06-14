import { Router } from "express";
import usersRouter from "./usersRouter.js";
import gamesRouter from "./gamesRouter.js";
import reviewsRouter from "./reviewsRouter.js";
import votesRouter from "./votesRouter.js";
import followsRouter from "./followsRouter.js";
import librariesRouter from "./librariesRouter.js";

const router = Router();

router
  .use("/users", usersRouter)
  .use("/games", gamesRouter)
  .use("/reviews", reviewsRouter)
  .use("/votes", votesRouter)
  .use("/follows", followsRouter)
  .use("/libraries", librariesRouter);

export default router;
