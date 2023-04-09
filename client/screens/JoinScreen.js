import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../utils/style";
import { db } from "../utils/firebase";
import { doc, updateDoc, arrayUnion } from "@firebase/firestore";
import { getDeviceId } from "../utils/useSecureStore";

const JoinScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params;
  const [code, setCode] = useState("");

  const handleCodeChange = (text) => {
    setCode(text.toUpperCase().replace(/I/g, "L"));
  };

  const handleSubmit = () => {
    async function findGame(code) {
      const uniqueId = await getDeviceId();
      console.log({ uniqueId });
      updateDoc(doc(db, "games", code), {
        users: { ...{ [`${uniqueId}`]: username } },
      });
      console.log("ready to navigate");
      navigation.navigate("Game", { code: code, username: username });
    }
    findGame(code);
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
