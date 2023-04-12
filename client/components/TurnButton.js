import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../utils/style";

const TurnButton = ({ setTurn, direction }) => {
  const [turnFn, setTurnFn] = useState(null);

  const handleSetTurn = () => {
    setTurn(direction);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSetTurn}>
      <Text style={styles.buttonText}>{direction == -1 ? "Prev" : "Next"}</Text>
    </TouchableOpacity>
  );
};

export default TurnButton;
