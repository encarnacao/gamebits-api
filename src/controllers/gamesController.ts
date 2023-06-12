import { gameParams, searchQuery } from "@/schemas/gamesSchemas";
import gamesSerivices from "@/services/gamesServices";
import { Request, Response, NextFunction } from "express";

async function searchGame(req: Request, res: Response, next: NextFunction) {
  const query = req.query as unknown as searchQuery;
  try {
    const games = await gamesSerivices.searchGame(query.name);
    res.status(200).json(games);
  } catch (err) {
    next(err);
  }
}

async function getGameById(req: Request, res: Response, next: NextFunction) {
  const params = req.params as unknown as gameParams;
  try {
    const game = await gamesSerivices.getGameById(params.id);
    res.status(200).json(game);
  } catch (err) {
    next(err);
  }
}

const gamesController = {
  searchGame,
  getGameById,
};

export default gamesController;
