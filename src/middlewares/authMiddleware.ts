import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import errors from "@/errors";
import userRepository from "@/repositories/userRepository";
import { Session } from "@/protocols";


async function validateCredentials(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");
	if (!token) throw errors.unauthorizedError();
	try {
		const session = jwt.verify(token, process.env.JWT_SECRET) as Session;
		const user = await userRepository.findUser(session.email);
		if (!user) throw errors.unauthorizedError();
		delete user.password;
		res.locals.user = user;
		next();
	} catch (err) {
		throw errors.unauthorizedError();
	}
}

export default validateCredentials;
