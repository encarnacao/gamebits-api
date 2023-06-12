import gamesController from "@/controllers/gamesController";
import { validateParams, validateQuery } from "@/middlewares/validateSchema";
import { gameParamsSchema, searchSchema } from "@/schemas/gamesSchemas";
import { Router } from "express";

const gamesRouter = Router();

gamesRouter.post("/", validateQuery(searchSchema), gamesController.searchGame);
gamesRouter.get("/:id", validateParams(gameParamsSchema), gamesController.getGameById);

export default gamesRouter;
