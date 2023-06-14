import { LibraryUpdate } from "@/protocols";
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

async function updateEntry(req: Request, res: Response, next: NextFunction) {
  const user: users = res.locals.user;
  const { id } = req.params;
  const body = req.body as LibraryUpdate;
  try {
    const update = await libraryServices.updateEntry(user.id, Number(id), body);
    res.status(200).send(update);
  } catch (err) {
    next(err);
  }
}

export { addGame, removeGame, updateEntry };
