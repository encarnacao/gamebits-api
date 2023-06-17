import { Router } from "express";
import usersRouter from "./usersRouter";
import gamesRouter from "./gamesRouter";
import reviewsRouter from "./reviewsRouter";
import votesRouter from "./votesRouter";
import followsRouter from "./followsRouter";
import librariesRouter from "./librariesRouter";

const router = Router();

router
  .use("/users", usersRouter)
  .use("/games", gamesRouter)
  .use("/reviews", reviewsRouter)
  .use("/votes", votesRouter)
  .use("/follows", followsRouter)
  .use("/libraries", librariesRouter);

export default router;
