import gamesController from "@/controllers/gamesController";
import { Router } from "express";

const gamesRouter = Router();

gamesRouter.post("/", gamesController.searchGame);

export default gamesRouter;
