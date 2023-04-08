import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../style";

const HomeScreen = () => {
  const navigation = useNavigation();
  const navigateToJoinScreen = () => {
    navigation.navigate("Join");
  };
  const navigateToGameScreen = () => {
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

export default HomeScreen;
