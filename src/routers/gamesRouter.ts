import gamesController from "@/controllers/gamesController";
import { validateQuery } from "@/middlewares/validateSchema";
import { searchSchema } from "@/schemas/gamesSchemas";
import { Router } from "express";

const gamesRouter = Router();

gamesRouter.post("/", validateQuery(searchSchema), gamesController.searchGame);

export default gamesRouter;
