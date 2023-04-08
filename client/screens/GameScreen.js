import React from "react";
import { Text, View } from "react-native";

const GameScreen = ({ route }) => {
  const { code } = route.params;
  return (
    <View>
      <Text>GameScreen</Text>
      <Text>Code: {code}</Text>
    </View>
  );
};

export default GameScreen;
