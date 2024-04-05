const handleUpdateUserDetails = (data, userFound) => {
	const { first_name, last_name, avatar, domain, gender, available } = data;	

    //validating types of each properties
	if (first_name) {
		if (typeof first_name === "string" && first_name.trim())
			userFound.first_name = first_name.trim();
		else
			return {
				message: "provide valid first name",
				statusCode: 400,
			};
	}

	if (last_name) {
		if (typeof last_name === "string" && last_name.trim())
			userFound.last_name = last_name.trim();
		else
			return {
				message: "provide valid last name",
				statusCode: 400,
			};
	}

	if (avatar) userFound.avatar = avatar;
	if (domain) userFound.domain = domain;

	if (gender && typeof gender === "string") {
		const trimmedGender = gender.trim();
		if (trimmedGender === "Male" || trimmedGender === "Female") {
			userFound.gender = trimmedGender;
		} else {
			return {
				message: "provide valid gender",
				statusCode: 400,
			};
		}
	}

	if (typeof available !== "undefined") {
		if (typeof available === "boolean") userFound.available = available;
		else
			return {
				message: "Provide valid available value",
				statusCode: 400,
			};
	}
};

export { handleUpdateUserDetails };
