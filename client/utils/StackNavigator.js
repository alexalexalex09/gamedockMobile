import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import JoinScreen from "../screens/JoinScreen";
import GameScreen from "../screens/GameScreen";
import RoomScreen from "../screens/RoomScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Join" component={JoinScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Room" component={RoomScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
