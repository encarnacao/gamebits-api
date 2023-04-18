import { Request, Response, NextFunction } from "express";
import errors from "@/errors";
import userRepository from "@/repositories/userRepository";

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
