const validateUserData = (data) => {
	const { first_name, last_name, email, avatar, domain, gender } = data;

    // sending error message with status code according to the condition which matches
    if (!email || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
        return {
            message: "Please enter valid email id",
            statusCode: 400,
        };
    }
	if (!first_name) {
		return {
			message: "Please enter first name",
			statusCode: 400,
		};
	}
	if (!last_name) {
		return {
			message: "Please enter last name",
			statusCode: 400,
		};
	}
	if (!domain) {
		return {
			message: "Please enter your domain",
			statusCode: 400,
		};
	}
	if (!gender) {
		return {
			message: "Please enter you gender",
			statusCode: 400,
		};
	}

	return null;
};

export { validateUserData };
