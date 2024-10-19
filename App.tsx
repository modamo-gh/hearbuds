import { View } from "react-native";
import ArtistSearch from "./src/components/ArtistSearch";

const App = () => {
    return (
        <View style={{flex: 1}}>
            <ArtistSearch />
            <ArtistSearch />
        </View>
    );
};

export default App;
