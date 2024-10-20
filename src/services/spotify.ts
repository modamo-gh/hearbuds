import axios from "axios";
import qs from "qs";
import { EXPO_SPOTIFY_CLIENT_ID, EXPO_SPOTIFY_CLIENT_SECRET } from "@env";

const getAuth = async () => {
	const clientID = EXPO_SPOTIFY_CLIENT_ID;
	const clientSecret = EXPO_SPOTIFY_CLIENT_SECRET;

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

export const search = async (searchTerm: string) => {
	try {
		const token = await getAuth();

		if (!token) {
			console.log("No token");
		}

		const response = await axios.get(
			`https://api.spotify.com/v1/search?q=${encodeURIComponent(
				searchTerm
			)}&type=artist`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		
		return response.data.artists.items;
	} catch (error) {
		console.log(error);
	}
};
