import gamesSerivices from "@/services/gamesServices";
import { Request, Response, NextFunction } from "express";

interface searchGameQuery {
  name?: string;
}

async function searchGame(req: Request, res: Response, next: NextFunction) {
  const { name: gameName } = req.query as searchGameQuery;
  if (!gameName){
    return res.sendStatus(400);
  }
  try {
    const games = await gamesSerivices.searchGame(gameName);
    res.status(200).json(games);
  } catch (err) {
    next(err);
  }
}

const gamesController = {
  searchGame,
};

export default gamesController;
