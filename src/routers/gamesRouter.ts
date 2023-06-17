import { getGameById } from "@/controllers/gamesController";
import { validateParams, validateQuery } from "@/middlewares";
import { searchSchema, paramsSchema } from "@/schemas";
import { searchGame } from "@/services/gamesServices";
import { Router } from "express";

const gamesRouter = Router();

gamesRouter
  .post("/", validateQuery(searchSchema), searchGame)
  .get("/:id", validateParams(paramsSchema), getGameById);

export default gamesRouter;
