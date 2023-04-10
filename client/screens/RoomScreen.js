import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
//import styles from "../utils/style";
import { db } from "../utils/firebase";
import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import ColorPicker from "../components/ColorPicker";
import HamburgerMenu from "../components/HamburgerMenu";

const RoomScreen = () => {
  const [backgroundColor, setBackgroundColor] = useState("#D2B48C");
  const [colorChosen, setColorChosen] = useState(false);

  const handleUpdateColor = (color) => {
    setBackgroundColor(color);
    setColorChosen(true);
  };
  const handleMenuSelect = (option) => {
    switch (option) {
      case "color":
        setColorChosen(false);
        break;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {!colorChosen && (
        <ColorPicker updateColor={handleUpdateColor}></ColorPicker>
      )}
      {colorChosen && (
        <HamburgerMenu menuSelect={handleMenuSelect}></HamburgerMenu>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  colorBox: {
    width: 50,
    height: 50,
  },
});

export default RoomScreen;
