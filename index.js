//configuring environment variables
import { config } from "dotenv";
config({ path: ".env" });

import { app } from "./app.js";
import { connectToDatabase } from "./data/connectToDB.js";

await connectToDatabase();

const { PORT } = process.env;
app.listen(PORT, () => {
	console.log("app listening on port: ", PORT);
});
