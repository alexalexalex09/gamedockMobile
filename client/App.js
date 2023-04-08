import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import deviceId from "./deviceId";

export default function App() {
  useEffect(() => {
    deviceId();
  }, []);
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
