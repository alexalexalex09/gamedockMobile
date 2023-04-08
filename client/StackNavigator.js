import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import JoinScreen from "./screens/JoinScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Join" component={JoinScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
