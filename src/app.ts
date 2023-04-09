import "express-async-errors";
import "dotenv/config";
import cors from "cors";
import express, { json } from "express";
import router from "./routers/index.js";
import { handleApplicationErrors } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(handleApplicationErrors);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
