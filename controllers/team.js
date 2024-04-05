import { isValidObjectId } from "mongoose";
import { Team } from "../models/team.js";

const getAllTeams = async (req, res, next) => {
	try {
		const teams = await Team.find().select("-users");

		if (!teams) {
			return next({
				message: "Team not found",
				statusCode: 404,
			});
		}

		res.json({
			success: true,
			data: teams,
			message: "Team details retrieved successfully",
		});
	} catch (error) {
		next(error);
	}
};
const getTeamDetails = async (req, res, next) => {
	try {
		const { id } = req.params;
		const team = await Team.findById(id).populate({
			path: "users",
			select: "first_name last_name avatar domain",
		});

		if (!team) {
			return next({
				message: "Team not found",
				statusCode: 404,
			});
		}

		const teamDetails = {
			name: team.name,
			users: team.users.map(
				({ first_name, last_name, avatar, domain }) => ({
					name: `${first_name} ${last_name}`,
					avatar,
					domain,
				})
			),
		};

		res.json({
			success: true,
			data: teamDetails,
			message: "Team details retrieved successfully",
		});
	} catch (error) {
		next(error);
	}
};

const createNewTeam = async (req, res, next) => {
	try {
		const { name, users } = req.body;

		// Create an empty object to store users by domain meaning object will be like this
		// {
		//     sales: "U32bds232309230303", //storing the user id
		//     it : "Udslalk23203923902"
		// }
		const usersByDomain = {};
		const usersIds = [];

		let duplicationError = null;
		for (const user of users) {
			if (duplicationError) {
				break; // Stop checking ahead if any error is found
			}

			if (usersByDomain[user.domain] || usersIds.includes(user.id)) {
				duplicationError = {
					message: "Two users with the same domain found",
					statusCode: 400,
				};
			} else if (!isValidObjectId(user.id)) {
				duplicationError = {
					message: "Invalid user id found",
					statusCode: 400,
				};
			} else {
				usersByDomain[user.domain] = user.id;
				usersIds.push(user.id);
			}
		}

		if (duplicationError) return next(duplicationError);

		const teamFound = await Team.findOne({ name });

		//check if team already exists or not
		if (teamFound) {
			return next({
				message: "Team name already exists",
				statusCode: 400,
			});
		}

		await Team.create({ name, users: usersIds });

		res.json({
			success: true,
			message: "team created successfully.",
		});
	} catch (error) {
		next(error);
	}
};

export { getAllTeams, getTeamDetails, createNewTeam };
