import libraryServices from "@/services/libraryServices";
import { users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

function addGame(isWishlist: boolean) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user: users = res.locals.user;
    const { id } = req.params;
    try {
      const entry = await libraryServices.addGameToLibrary(
        user,
        Number(id),
        isWishlist
      );
      res.status(201).send(entry);
    } catch (err) {
      next(err);
    }
  };
}

const libraryController = {
  addGame,
};

export default libraryController;
