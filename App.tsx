import { View } from "react-native";
import ArtistSearch from "./src/components/ArtistSearch";
import { useState } from "react";
import { getRelatedArtists } from "./src/services/spotify";

const App = () => {
	const matches = [];

	const [artists, setArtists] = useState([]);

	const compareArtists = (artists) => {
		const relatedArtists = [];

        console.log(artists)

		// for (const artist of artists) {
		// 	let b = await getRelatedArtists(artist);
		// 	let a = { ...artist, relatedArtists: b };

		// 	console.log(a);
		// }

		// for (let i = 0; i < artists.length; i++) {
		// 	let score: number;

		// 	for (const relatedArtist of artists[i].ra) {
		// 		if (relatedArtist.name === artists[(i + 1) % 2].name) {
		// 			score = Number(relatedArtist.match);
		// 			matches.push(score);
		// 		}
		// 	}

		// 	if (!score) {
		// 		for (const relatedArtist of artists[i].ra) {
		// 			compareArtists([relatedArtist, artists[(i + 1) % 2]])
		// 		}
		// 	} else {
		// 		console.log(
		// 			matches.reduce((p, c) => p + c, 0) / matches.length
		// 		);
		// 	}
		// }
	};

	return (
		<View style={{ flex: 1 }}>
			<ArtistSearch artists={artists} setArtists={setArtists} />
			<ArtistSearch artists={artists} setArtists={setArtists} />
			{artists.length === 2 ? compareArtists(artists) : null}
		</View>
	);
};

export default App;
