import { idParams, searchQuery } from "@/protocols";
import gamesServices from "@/services/gamesServices";
import { Request, Response, NextFunction } from "express";

async function searchGame(req: Request, res: Response, next: NextFunction) {
  const { name } = req.query as unknown as searchQuery;
  try {
    const games = await gamesServices.searchGame(name);
    res.json(games);
  } catch (err) {
    next(err);
  }
}

async function getGameById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const game = await gamesServices.getGameByIGDBId(Number(id));
    res.json(game);
  } catch (err) {
    next(err);
  }
}

export { searchGame, getGameById };
