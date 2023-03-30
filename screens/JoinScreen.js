import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

export default function JoinScreen({ navigation }) {
  const [code, setCode] = useState("");

  const handleChangeCode = (newText) => {
    // Remove any non-letter characters and convert to uppercase
    const validatedText = newText.replace(/[^A-Za-z]/g, "").toUpperCase();
    setCode(validatedText);
  };

  const handlePressStart = async () => {
    if (text.length !== 5) {
      Alert.alert("Please enter some text");
    } else {
      try {
        const response = await fetch("https://example.com/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: code,
          }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Code</Text>
      <TextInput
        style={styles.codeInput}
        value={code}
        onChangeText={handleChangeCode}
        placeholder="Enter Your Code Here"
      />
      <TouchableOpacity onPress={handlePressStart} style={styles.button}>
        <Text style={styles.buttonText}>Join Game</Text>
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
  codeInput: {
    fontSize: "2em",
    marginBottom: "0.5em",
    textAlign: "center",
  },
});
