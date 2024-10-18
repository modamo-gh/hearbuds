import { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { search } from "./src/services/spotify";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

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

      console.log(searchResults)
    }, 400),
    []
  );

  return (
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
      <View style={styles.display}>
        <Text style={{ color: "white", textAlign: "center" }}>
          {searchTerm}
        </Text>
      </View>
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

export default App;
