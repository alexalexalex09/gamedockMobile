import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import JoinScreen from "./screens/JoinScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  //Root view return
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Join" component={JoinScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
