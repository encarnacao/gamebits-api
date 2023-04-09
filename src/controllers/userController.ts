import { Request, Response, NextFunction } from "express";
import userServices from "../services/userServices.js";

async function createUser(req: Request, res: Response, next: NextFunction) {
	try {
		const create = await userServices.createUser(req.body);
		delete create.password;
		res.send(create);
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: "Internal Server Error" });
	}
}

export default { createUser };
