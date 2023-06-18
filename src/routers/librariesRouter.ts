import { Router } from "express";
import { validateBody, validateParams } from "@/middlewares";
import validateCredentials from "@/middlewares/authMiddleware";
import {
  addGame,
  removeGame,
  updateEntry,
  getLibrary,
} from "@/controllers/libraryController";
import { paramsSchema, libraryUpdateSchema } from "@/schemas";

const librariesRouter = Router();

librariesRouter
  .post(
    "/add/:id",
    validateCredentials,
    validateParams(paramsSchema),
    addGame(false)
  )
  .post(
    "/wishlist/:id",
    validateCredentials,
    validateParams(paramsSchema),
    addGame(true)
  )
  .delete("/:id", validateCredentials, validateParams(paramsSchema), removeGame)
  .put(
    "/:id",
    validateCredentials,
    validateParams(paramsSchema),
    validateBody(libraryUpdateSchema),
    updateEntry
  )
  .get("/:id", validateParams(paramsSchema), getLibrary(false))
  .get("/wishlist/:id", validateParams(paramsSchema), getLibrary(true));

export default librariesRouter;
