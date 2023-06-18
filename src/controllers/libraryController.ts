import { LibraryUpdate } from "@/protocols";
import libraryServices from "@/services/libraryServices";
import { users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

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
      res.status(httpStatus.CREATED).send(entry);
    } catch (err) {
      next(err);
    }
  };
}

function getLibrary(isWishlist: boolean) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const library = await libraryServices.searchLibrary(Number(id), isWishlist);
      res.status(httpStatus.OK).send(library);
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
    res.sendStatus(httpStatus.NO_CONTENT);
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
    res.status(httpStatus.OK).send(update);
  } catch (err) {
    next(err);
  }
}

export { addGame, removeGame, updateEntry, getLibrary };
