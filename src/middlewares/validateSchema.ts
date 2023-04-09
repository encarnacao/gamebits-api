import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import err from "../errors/index.js";

export function validateSchema(schema: ObjectSchema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body, { abortEarly: false });
		if (error) {
			const errors = error.details.map((err) => err.message);
			throw err.unprocessableEntityError(errors);
		}
		next();
	};
}
