import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const ColorPicker = ({ updateColor }) => {
  const changeColor = (color) => {
    switch (color) {
      case "red":
        updateColor("#FF0000");
        break;
      case "green":
        updateColor("#00FF00");
        break;
      case "blue":
        updateColor("#0000FF");
        break;
      case "purple":
        updateColor("#800080");
        break;
      default:
        updateColor("#D2B48C");
        break;
    }
  };

  return (
    <View>
      <Text>Choose a color:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeColor("red")}
      >
        <View style={[styles.colorBox, { backgroundColor: "#FF0000" }]} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeColor("green")}
      >
        <View style={[styles.colorBox, { backgroundColor: "#00FF00" }]} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeColor("blue")}
      >
        <View style={[styles.colorBox, { backgroundColor: "#0000FF" }]} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeColor("purple")}
      >
        <View style={[styles.colorBox, { backgroundColor: "#800080" }]} />
      </TouchableOpacity>
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
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
