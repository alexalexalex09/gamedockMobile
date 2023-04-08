import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./utils/StackNavigator";
import { setDeviceId } from "./utils/useSecureStore";

export default function App() {
  useEffect(() => {
    setDeviceId();
  }, []);
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
