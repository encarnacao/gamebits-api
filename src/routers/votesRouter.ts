import {
  createVote,
  deleteVote,
  updateVote,
} from "@/controllers/voteController";
import validateCredentials from "@/middlewares/authMiddleware";
import { validateBody, validateParams } from "@/middlewares/validateSchema";
import { paramsSchema } from "@/schemas/genericSchemas";
import { votingSchema } from "@/schemas/voteSchemas";
import { Router } from "express";

const votesRouter = Router();

votesRouter
  .post("/", validateCredentials, validateBody(votingSchema), createVote)
  .delete("/:id", validateCredentials, validateParams(paramsSchema), deleteVote)
  .put("/:id", validateCredentials, validateParams(paramsSchema), updateVote);

export default votesRouter;
