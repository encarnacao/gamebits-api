import { Router } from "express";
import { validateParams } from "../middlewares/validateSchema.js";
import validateCredentials from "@/middlewares/authMiddleware.js";
import { librarySchema } from "@/schemas/librarySchemas.js";
import libraryController from "@/controllers/libraryController.js";

const libraryRouter = Router();

libraryRouter.post(
  "/add/:id",
  validateCredentials,
  validateParams(librarySchema),
  libraryController.addGame
);

export default libraryRouter;
