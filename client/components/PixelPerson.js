import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
const frame0 = require("../assets/chick-0.png");
const frame1 = require("../assets/chick-1.png");

const animation = [frame0, frame1];
const PixelPerson = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [isTapped, setIsTapped] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isTapped) {
      let count = 0;
      intervalId = setInterval(() => {
        count++;
        if (count === 10) {
          setIsTapped(false);
          clearInterval(intervalId);
        }
        setCurrentFrame((currentFrame) => (currentFrame + 1) % 2);
        setX(x + (Math.random() * 2 - 1 / 4));
        setY(y + (Math.random() * 2 - 1) / 4);
        if (x > 100) {
          setX(100);
        }
        if (x < 0) {
          setX(0);
        }
        if (y > 100) {
          setY(100);
        }
        if (y < 0) {
          setY(0);
        }
      }, 500);
    }
    return () => clearInterval(intervalId);
  }, [isTapped]);

  const handleImageTap = () => {
    setIsTapped(true);
  };

  return (
    <View
      style={[
        styles.pixelContainer,
        styles.fill,
        { zIndex: -1, elevation: -1 },
      ]}
    >
      <TouchableOpacity
        onPress={handleImageTap}
        style={[{ left: x + "%", top: y + "%" }]}
      >
        <Image source={animation[currentFrame]} style={[styles.pixelImage]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pixelContainer: {},
  pixelImage: {
    width: 24,
    height: 24,
    position: "absolute",
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default PixelPerson;
