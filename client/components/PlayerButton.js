import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase"; // assuming you have initialized your Firebase app and exported the Firestore instance as 'db'
import { getDeviceId } from "../utils/useSecureStore";
import { useNavigation } from "@react-navigation/native";

const PlayerButton = ({ code, maxPlayers }) => {
  const navigation = useNavigation();
  if (code == null) {
    return <Text>Error: No code parameter</Text>;
  }
  const [startGame, setStartGame] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [myPlayerNum, setMyPlayerNum] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "games", code), (doc) => {
      if (doc.exists()) {
        setStartGame(doc.data().startGame);
        setCurrentPlayer(doc.data().currentPlayer);
      }
    });
    //TODO: Current player isn't getting pulled
    return unsubscribe;
  }, [startGame, currentPlayer]);

  const handlePlayer = () => {
    async function playerJoin() {
      const uniqueId = await getDeviceId();
      await updateDoc(doc(db, "games", code), {
        [`users.${uniqueId}.playerNum`]: currentPlayer,
        currentPlayer: currentPlayer + 1,
      });
      setMyPlayerNum(currentPlayer);
      navigation.navigate("Room", { code: code });
    }
    playerJoin();
  };

  if (!startGame) {
    return null;
  }

  if (currentPlayer > maxPlayers) {
    return null;
  }

  if (myPlayerNum) {
    return null;
  }

  return (
    <View style={{ margin: 10 }}>
      <Button title={"Player " + currentPlayer} onPress={handlePlayer} />
    </View>
  );
};

export default PlayerButton;
