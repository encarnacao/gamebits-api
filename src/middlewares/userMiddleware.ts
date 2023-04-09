import { Request, Response, NextFunction } from "express";
import errors from "../errors/index.js";
import userRepository from "../repositories/userRepository.js";

async function checkConflict(req: Request, res: Response, next: NextFunction) {
	const { email } = req.body;
	try {
		const user = await userRepository.findUserByEmail(email);
		if (user) {
			throw errors.emailConflictError(email);
		}
		next();
	} catch (err) {
		next(err);
	}
}

export default { checkConflict };
