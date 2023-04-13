import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { EasingNode } from "react-native-reanimated";

const YourTurn = () => {
  const [animationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.timing(animationValue, {
      toValue: 1,
      duration: 2000,
      easing: EasingNode.bounce,
      useNativeDriver: true,
    });

    animation.start();

    return () => {
      if (!animation.finished) {
        animation.stop();
      }
    };
  }, [animationValue]);

  const animatedStyle = {
    transform: [
      {
        scale: animationValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.2, 1],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, animatedStyle]}>
        It's Your Turn!
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffc0cb",
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default YourTurn;
