import { useCallback, useState } from "react";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import { search } from "../services/spotify";

const ArtistSearch = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [dimension, setDimension] = useState(0);
	const [artist, setArtist] = useState({});

	const debounce = <T extends (...args: any[]) => any>(
		func: T,
		delay: number
	) => {
		let timeOutId: NodeJS.Timeout;

		return (...args: Parameters<T>) => {
			if (timeOutId) {
				clearTimeout(timeOutId);
			}

			timeOutId = setTimeout(() => {
				func(...args);
			}, delay);
		};
	};

	const handleSearch = useCallback(
		debounce(async (text: string) => {
			const searchResults = await search(text);

			for (const searchResult of searchResults) {
				console.log(searchResult);
			}

			setSearchResults(searchResults);
		}, 400),
		[]
	);

	return Object.keys(artist).length ? (
		<View
			style={[
				{ justifyContent: "center", alignItems: "center" },
				styles.container
			]}
		>
			<View>
				<Image
					width={artist.dimension / 2}
					height={artist.dimension / 2}
					source={{ uri: artist.url }}
					style={{ borderRadius: 100 }}
				/>
				<Text
					style={{
						color: "white",
						marginTop: 8,
						maxWidth: dimension / 2,
						textAlign: "center",
						numberOfLines: 2
					}}
				>
					{artist.name}
				</Text>
			</View>
		</View>
	) : (
		<View style={styles.container}>
			<View style={styles.search}>
				<TextInput
					onChangeText={(text) => {
						setSearchTerm(text);
						handleSearch(text);
					}}
					placeholder="Who are you looking for?"
					placeholderTextColor="#7D7D7D"
					selectionColor="#1DB954"
					style={styles.textInput}
					value={searchTerm}
				/>
			</View>
			<FlatList
				contentContainerStyle={{
					marginHorizontal: 16
				}}
				data={searchResults}
				numColumns={2}
				onLayout={(event) => {
					const { width } = event.nativeEvent.layout;
					setDimension(width);
				}}
				renderItem={({ item, index }) => (
					<TouchableOpacity
						onPress={() =>
							setArtist({
								url: item.images[0]?.url,
								dimension,
								name: item.name
							})
						}
						style={[
							index % 2 === 0
								? { marginRight: 8 }
								: { marginLeft: 8 },
							{ marginBottom: 16 }
						]}
					>
						<Image
							width={dimension / 2 - 24}
							height={dimension / 2 - 24}
							source={{ uri: item.images[0]?.url }}
							style={{ borderRadius: 5 }}
						/>
						<Text
							style={{
								color: "white",
								marginTop: 8,
								maxWidth: dimension / 2 - 24,
								numberOfLines: 2
							}}
						>
							{item.name}
						</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { backgroundColor: "#121212", flex: 1 },
	display: {
		alignContent: "center",
		flex: 4,
		flexDirection: "column",
		justifyContent: "center"
	},
	search: {
		alignItems: "center",
		flexDirection: "row",
		marginBottom: 8,
		marginTop: 64,
		width: "100%"
	},
	textInput: {
		borderColor: "#1DB954",
		borderRadius: 5,
		borderWidth: 1,
		color: "#FCFCFC",
		flex: 1,
		height: 48,
		marginHorizontal: 16,
		paddingHorizontal: 8
	}
});

export default ArtistSearch;
