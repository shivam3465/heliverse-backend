import { User } from "../models/user.js";
import { handleUpdateUserDetails } from "../utils/updateUserData.js";
import { validateUserData } from "../utils/validateUserData.js";

const getAllUsers = async (req, res, next) => {
	try {
		const { name, domain, gender, available, pageNo } = req.query;
		const queryObject = {};

		if (name) {
			const nameRegex = new RegExp(name, "i"); // case insensitive regex

			queryObject.$or = [
				{ first_name: { $regex: nameRegex } }, // if the name matches in first_name
				{ last_name: { $regex: nameRegex } }, // if the name matches in last_name
				{
					$expr: {
						$regexMatch: {
							input: {
								$concat: ["$first_name", " ", "$last_name"], // if the name as a whole word matches with first_name and last_name combined
							},
							regex: nameRegex,
						},
					},
				},
			];
		}

		//additional filters which are applied
		if (domain) {
			queryObject.domain = domain;
		}
		if (gender) {
			queryObject.gender = gender;
		}
		if (available) {
			queryObject.available = available;
		}

		// Pagination
		const pageSize = 20; // Number of results per page
		const pageNumber = pageNo ? parseInt(pageNo) : 1; // Convert page number to integer, default to 1 if not provided

		const totalResults = await User.countDocuments(queryObject);
		const totalPages = Math.ceil(totalResults / pageSize);

		const users = await User.find(queryObject)
			.skip((pageNumber - 1) * pageSize) // Skip appropriate number of documents based on page number
			.limit(pageSize); // Limit the number of results returned

		res.json({
			success: true,
			data: { totalResults, totalPages, currentPage: pageNumber, users },
			message: "Users found successfully.",
		});
	} catch (error) {
		//handling the error globally
		next(error);
	}
};

const addNewUser = async (req, res, next) => {
	try {
		const {
			first_name,
			last_name,
			email,
			avatar, // here assuming the avatar url will be provided as image upload should have to be done by backend but for that some media storage service like aws s3 should have been provided
			domain,
			gender,
			available,
		} = req.body;

		const id = Number(new Date()); //for generating unique id or we can use the last used unique id + 1 but for that it should be stored somewhere in database

		//handling the data validation of user data
		const err = validateUserData(req.body);
		if (err) {
			return next(err);
		}

		//check if the email id already exists or not
		const user = await User.findOne({ email });

		if (user) {
			return next({ message: "Email already exists ", statusCode: 400 });
		}

		// else creating a new user
		await User.create({
			first_name,
			last_name,
			email,
			avatar,
			domain,
			gender,
			available,
			id,
		});

		res.json({
			success: true,
			message: "Users created successfully.",
		});
	} catch (error) {
		//handling the error globally
		next(error);
	}
};

const getUserDetails = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (isNaN(Number(id))) {
			return next({
				message: "Invalid user ID",
				statusCode: 400,
			});
		}

		// else creating a new user
		const userFound = await User.findOne({ id });

		if (!userFound) {
			return next({
				message: "No such user exists",
				statusCode: 400,
			});
		}

		res.json({
			success: true,
			data: userFound,
			message: "Users found successfully.",
		});
	} catch (error) {
		//handling the error globally
		next(error);
	}
};

const updateUserDetails = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (isNaN(Number(id))) {
			return next({
				message: "Invalid user ID",
				statusCode: 400,
			});
		}

		// else creating a new user
		const userFound = await User.findOne({ id });

		if (!userFound) {
			return next({
				message: "No such user exists",
				statusCode: 400,
			});
		}

		//validating and saving the updates of the user data
		const err = handleUpdateUserDetails(req.body, userFound);

		if (err) return next(err);

		//saving the updates
		await userFound.save();

		res.json({
			success: true,
			message: "Users details updated successfully.",
		});
	} catch (error) {
		//handling the error globally
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (isNaN(Number(id))) {
			return next({
				message: "Invalid user ID",
				statusCode: 400,
			});
		}

		// deleting the user
		await User.findOneAndDelete({ id });

		res.json({
			success: true,
			message: "Users deleted successfully.",
		});
	} catch (error) {
		//handling the error globally
		next(error);
	}
};

export {
	getAllUsers,
	addNewUser,
	getUserDetails,
	updateUserDetails,
	deleteUser,
};
