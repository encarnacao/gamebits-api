import { Router } from "express";
import { validateParams } from "../middlewares/validateSchema.js";
import validateCredentials from "@/middlewares/authMiddleware.js";
import { librarySchema } from "@/schemas/librarySchemas.js";
import { addGame } from "@/controllers/libraryController.js";

const libraryRouter = Router();

libraryRouter.post(
  "/add/:id",
  validateCredentials,
  validateParams(librarySchema),
  addGame
);

export default libraryRouter;
