import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../utils/style";
import { db } from "../utils/firebase";
import { doc, setDoc, serverTimestamp } from "@firebase/firestore";
import { getDeviceId } from "../utils/useSecureStore";

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToJoinScreen = () => {
    navigation.navigate("Join");
  };

  const navigateToGameScreen = async () => {
    const uniqueId = await getDeviceId();
    const code = generateRandomString(5);
    setDoc(doc(db, "games", code), {
      timeStamp: serverTimestamp(),
      users: [uniqueId],
      owner: uniqueId,
    });
    navigation.navigate("Game", { code: code });
  };

  const [username, setUsername] = useState("");

  const handleUsernameChange = (text) => {
    setCode(text.toUpperCase().replace(/I/g, "L"));
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={username}
        onChangeText={handleUsernameChange}
        placeholder="Enter Your Username"
        autoFocus={true}
      />
      <TouchableOpacity style={styles.button} onPress={navigateToJoinScreen}>
        <Text style={styles.buttonText}>Input Code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToGameScreen}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

function generateRandomString(length) {
  const letters = "ABCDEFGHJKLMNPQRSTUVWYZ"; // Exclude "I", "F", and "X"
  let result = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * letters.length);
    result += letters.charAt(randomIndex);
  }
  //TODO: Check to see if this is already taken
  return result;
}

export default HomeScreen;
