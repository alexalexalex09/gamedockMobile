import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../style";

const JoinScreen = () => {
  const [code, setCode] = useState("");

  const handleCodeChange = (text) => {
    setCode(text.toUpperCase().replace(/I/g, "L"));
  };

  const handleSubmit = () => {
    // Handle submission logic here
  };

  return (
    <View style={styles.container}>
      <Text>Input Code</Text>
      <TextInput
        value={code}
        onChangeText={handleCodeChange}
        placeholder="Enter code"
        autoFocus={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinScreen;
