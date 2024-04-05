import { Router } from "express";
import {
	addNewUser,
	deleteUser,
	getAllUsers,
	getUserDetails,
	updateUserDetails,
} from "../controllers/user.js";

const router = Router();

router.route("/users")
    .get(getAllUsers)
    .post(addNewUser);

router
	.route("/users/:id")
	.get(getUserDetails)
	.put(updateUserDetails)
	.delete(deleteUser);

export default router;
