import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../style";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "@firebase/firestore";
import { getDeviceId } from "../deviceId";

const HomeScreen = () => {
  const navigation = useNavigation();
  const navigateToJoinScreen = () => {
    navigation.navigate("Join");
  };
  const navigateToGameScreen = async () => {
    const uniqueId = await getDeviceId();
    console.log({ uniqueId });
    setDoc(doc(db, "games", generateRandomString(5)), {
      timeStamp: serverTimestamp(),
      users: [uniqueId],
      owner: uniqueId,
    });
    navigation.navigate("Game");
  };
  return (
    <View style={styles.container}>
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
