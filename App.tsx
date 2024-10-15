import { StyleSheet, TextInput, View } from "react-native";

const App = () => {
  return <View style={styles.container}><View style={styles.search}><TextInput placeholder="Who are you looking for?"
    placeholderTextColor="#7D7D7D"
    selectionColor="#1DB954" style={styles.textInput} /></View><View style={styles.display}></View></View>
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#121212", flex: 1 }, display: { flex: 4 }, search: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
    marginTop: 64,
    width: "100%"
  }, textInput: {
    borderColor: "#1DB954",
    borderRadius: 5,
    borderWidth: 1,
    color: "#FCFCFC",
    flex: 1,
    height: 48,
    marginHorizontal: 16,
    paddingHorizontal: 8
  }
})

export default App;