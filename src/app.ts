import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/userRouters.js";

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World");
});

app.use(cors());
app.use(express.json());
app.use(userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
