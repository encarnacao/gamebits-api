import { idParams, searchQuery } from "@/protocols";
import gamesServices from "@/services/gamesServices";
import { Request, Response, NextFunction } from "express";

async function searchGame(req: Request, res: Response, next: NextFunction) {
  const { name } = req.query as unknown as searchQuery;
  try {
    const games = await gamesServices.searchGame(name);
    res.status(200).json(games);
  } catch (err) {
    next(err);
  }
}

async function getGameById(req: Request, res: Response, next: NextFunction) {
  const params = req.params as unknown as idParams;
  try {
    const game = await gamesServices.getGameByIGDBId(params.id);
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
