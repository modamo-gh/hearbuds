import axios from "axios";
import qs from "qs";

const getAuth = async () => {
	let clientID;
	let clientSecret;

	const headers = {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		auth: { username: clientID, password: clientSecret }
	};

	const data = { grant_type: "client_credentials" };

	try {
		const response = await axios.post(
			"https://accounts.spotify.com/api/token",
			qs.stringify(data),
			headers
		);

		return response.data.access_token;
	} catch (error) {
		console.log(error);
	}
};

export const test = async () => {
	try {
		const token = await getAuth();

		console.log(token);
	} catch (error) {
		console.log(error);
	}
};
