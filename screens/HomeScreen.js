import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  const navigateToInputCodeScreen = () => {
    navigation.navigate("Join");
  };

  const navigateToGameScreen = () => {
    navigation.navigate("New");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GameSync</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToInputCodeScreen}
      >
        <Text style={styles.buttonText}>Input Code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToGameScreen}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

//TODO: Take from a central source
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
