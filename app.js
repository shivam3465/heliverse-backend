import express from "express";
import cors from "cors";
import { errorHandler } from "./errorHandler/errorHandler.js";
import userRouter from "./routes/user.js";
import teamRouter from "./routes/team.js";
// import { getAllUsers } from "./controllers/user.js";

const app = express();

app.use(express.json());

app.use(
	cors({
		methods: ["GET", "POST", "DELETE", "PUT"],
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use("/api", userRouter);
app.use("/api", teamRouter);
// app.get("/api/users", getAllUsers);

//global error handler will be last to be called
app.use(errorHandler);

export { app };
