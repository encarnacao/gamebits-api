import libraryServices from "@/services/libraryServices";
import { users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

function addGame(isWishlist: boolean) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user: users = res.locals.user;
    const { id } = req.params;
    try {
      const entry = await libraryServices.addGameToLibrary(
        user.id,
        Number(id),
        isWishlist
      );
      res.status(201).send(entry);
    } catch (err) {
      next(err);
    }
  };
}

async function removeGame(req: Request, res: Response, next: NextFunction) {
  const user: users = res.locals.user;
  const { id } = req.params;
  try {
    await libraryServices.removeFromLibrary(user.id, Number(id));
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

const libraryController = {
  addGame,
};

export default libraryController;
