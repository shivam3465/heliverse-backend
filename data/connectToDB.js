import mongoose from "mongoose";

const connectToDatabase = async () => {
	const { MONGODB_URI } = process.env;

	mongoose
		.connect(MONGODB_URI, { dbName: "HellVerse" })
		.then(() => {
			console.log("Database connected successfully");
		})
		.catch((err) => {
			console.error(err);
		});
};

export { connectToDatabase };
