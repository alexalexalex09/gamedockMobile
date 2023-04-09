import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../utils/style";
import { db } from "../utils/firebase";
import { doc, setDoc, serverTimestamp } from "@firebase/firestore";
import {
  getDeviceId,
  getLocalUsername,
  setLocalUsername,
} from "../utils/useSecureStore";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  useEffect(() => {
    async function getName() {
      const localUsername = await getLocalUsername();
      if (localUsername != null && localUsername.length > 0) {
        setUsername(localUsername);
      }
    }

    getName();
  }, []);

  const navigateToJoinScreen = () => {
    if (username == null || username.length == 0) {
      console.log("Please enter your name!");
      return;
    }
    navigation.navigate("Join", { username: username });
  };

  const navigateToGameScreen = async () => {
    if (username == null || username.length == 0) {
      console.log("Please enter your name!");
      return;
    }
    const uniqueId = await getDeviceId();
    const code = generateRandomString(5);
    setDoc(doc(db, "games", code), {
      timeStamp: serverTimestamp(),
      users: { [`${uniqueId}`]: username },
      owner: { id: uniqueId, username: username },
    });
    console.log(username);
    setLocalUsername(username);
    navigation.navigate("Game", { code: code, username: username });
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={username}
        onChangeText={handleUsernameChange}
        placeholder="Enter Your Username"
        autoFocus={true}
        style={styles.inputText}
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
