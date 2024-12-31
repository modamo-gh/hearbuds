import axios from "axios";
import qs from "qs";
import { configDotenv } from "dotenv";

const getAuth = async () => {
	const clientID = "05e9092753344f6c8cb7123aec806b61";
	const clientSecret = "c8b39593e027493db36f4468cd8f5d1b";

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

export const getRelatedArtists = async (name: string) => {
	try {
		// const token = await getAuth();

		// if (!token) {
		// 	console.log("No token");
		// }

		const response = await axios.get(
			`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodeURIComponent(
				name
			)}&api_key=${process.env.API_KEY}&format=json`
		);

		return response.data.similarartists.artist.map((relatedArtist) => ({
			name: relatedArtist.name,
			match: relatedArtist.match
		}));
	} catch (error) {
		console.log("Error retrieving related artists", error);
	}
};
