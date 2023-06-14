import { getGameById } from "@/controllers/gamesController";
import { validateParams, validateQuery } from "@/middlewares/validateSchema";
import { searchSchema } from "@/schemas/gamesSchemas";
import { paramsSchema } from "@/schemas/genericSchemas";
import { searchGame } from "@/services/gamesServices";
import { Router } from "express";

const gamesRouter = Router();

gamesRouter
  .post("/", validateQuery(searchSchema), searchGame)
  .get("/:id", validateParams(paramsSchema), getGameById);

export default gamesRouter;
