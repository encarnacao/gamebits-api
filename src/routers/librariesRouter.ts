import { Router } from "express";
import { validateBody, validateParams } from "../middlewares/validateSchema.js";
import validateCredentials from "@/middlewares/authMiddleware.js";
import { libraryUpdateSchema } from "@/schemas/librarySchemas.js";
import {
  addGame,
  removeGame,
  updateEntry,
} from "@/controllers/libraryController.js";
import { paramsSchema } from "@/schemas/genericSchemas.js";

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
  );

export default librariesRouter;
