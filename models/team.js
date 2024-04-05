import mongoose from "mongoose";
import { User } from "./user.js";

// Explicitly register the "users" model
mongoose.model("users", User.schema, "users");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  ],
});

export const Team = mongoose.model("Team", teamSchema);