import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import styles from "../utils/style";

const ColorPicker = ({ updateColor }) => {
  const changeColor = (color) => {
    switch (color) {
      case "red":
        updateColor("#FF4136");
        break;
      case "green":
        updateColor("#27ae60");
        break;
      case "blue":
        updateColor("#27ae60");
        break;
      case "purple":
        updateColor("#B10DC9");
        break;
      case "yellow":
        updateColor("#f1c40f");
        break;
      case "orange":
        updateColor("#FF851B");
        break;
      case "pink":
        updateColor("#FFD1DC");
        break;
      case "turquiose":
        updateColor("#7FDBFF");
        break;
      case "brown":
        updateColor("#8B4513");
        break;
      case "black":
        updateColor("#333333");
        break;
      case "gray":
        updateColor("#AAAAAA");
        break;
      case "white":
        updateColor("#FFFFFF");
        break;
      default:
        updateColor("#D2B48C");
        break;
    }
  };

  return (
    <View>
      <Text style={[styles.rounded, styles.colorText]}>Choose a color:</Text>
      <View style={styles.colorPicker}>
        <TouchableOpacity
          style={[styles.button, styles.colorButton]}
          onPress={() => changeColor("red")}
        >
          <View style={[styles.colorBox, { backgroundColor: "#FF4136" }]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.colorButton]}
          onPress={() => changeColor("green")}
        >
          <View style={[styles.colorBox, { backgroundColor: "#27ae60" }]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.colorButton]}
          onPress={() => changeColor("blue")}
        >
          <View style={[styles.colorBox, { backgroundColor: "#2980b9" }]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.colorButton]}
          onPress={() => changeColor("purple")}
        >
          <View style={[styles.colorBox, { backgroundColor: "#B10DC9" }]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.colorButton]}
          onPress={() => changeColor("yellow")}
        >
          <View style={[styles.colorBox, { backgroundColor: "#f1c40f" }]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.colorButton]}
          onPress={() => changeColor("orange")}
        >
          <View style={[styles.colorBox, { backgroundColor: "#FF851B" }]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.colorButton]}
          onPress={() => changeColor("pink")}
        >
          <View style={[styles.colorBox, { backgroundColor: "#FFD1DC" }]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.colorButton]}
          onPress={() => changeColor("turquiose")}
        >
          <View style={[styles.colorBox, { backgroundColor: "#7FDBFF" }]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.colorButton]}
          onPress={() => changeColor("brown")}
        >
          <View style={[styles.colorBox, { backgroundColor: "#8B4513" }]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.colorButton]}
          onPress={() => changeColor("black")}
        >
          <View style={[styles.colorBox, { backgroundColor: "#333333" }]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.colorButton]}
          onPress={() => changeColor("gray")}
        >
          <View style={[styles.colorBox, { backgroundColor: "#AAAAAA" }]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.colorButton]}
          onPress={() => changeColor("white")}
        >
          <View style={[styles.colorBox, { backgroundColor: "#FFFFFF" }]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ColorPicker;
