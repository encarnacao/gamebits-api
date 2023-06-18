import { Router } from "express";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "@/controllers/followController";
import validateCredentials from "@/middlewares/authMiddleware";
import { validateParams } from "@/middlewares";
import { paramsSchema } from "@/schemas";

const followsRouter = Router();

followsRouter
  .post("/:id", validateCredentials, validateParams(paramsSchema), followUser)
  .delete(
    "/:id",
    validateCredentials,
    validateParams(paramsSchema),
    unfollowUser
  )
  .get("/:id/followers", validateParams(paramsSchema), getFollowers)
  .get("/:id/following", validateParams(paramsSchema), getFollowing);

export default followsRouter;
