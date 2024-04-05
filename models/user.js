import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	id: Number,
	first_name: String,
	last_name: String,
	email: {
		type: String,
		unique: true,
	},
	gender: String,
	avatar: String,
	domain: String,
	available: { type: Boolean, default: false },
});

export const User = mongoose.model("users", userSchema, "users");
