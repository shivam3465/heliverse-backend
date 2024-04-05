import { Router } from "express";
import {
	getAllTeams,
	getTeamDetails,
	createNewTeam,
} from "../controllers/team.js";

const router = Router();

router.route("/team").get(getAllTeams).post(createNewTeam);
router.route("/team/:id").get(getTeamDetails);

export default router;
