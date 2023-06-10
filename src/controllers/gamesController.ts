import { searchQuery } from "@/schemas/gamesSchemas";
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

const gamesController = {
  searchGame,
};

export default gamesController;
