import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase"; // assuming you have initialized your Firebase app and exported the Firestore instance as 'db'
import { getDeviceId } from "../utils/useSecureStore";
import { useNavigation } from "@react-navigation/native";

const PlayerButton = ({ code }) => {
  const navigation = useNavigation();
  if (code == null) {
    return <Text>Error: No code parameter</Text>;
  }
  const [startGame, setStartGame] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState(0);
  const [settingPlayer, setSettingPlayer] = useState(1);
  const [myPlayerNum, setMyPlayerNum] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "games", code);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setStartGame(doc.data().startGame);
        setMaxPlayers(Object.keys(doc.data().users).length);
        setSettingPlayer(doc.data().settingPlayer);
        console.log({ maxPlayers });
        if (settingPlayer > maxPlayers) {
          navigation.navigate("Room");
        }
      }
    });

    return unsubscribe;
  }, [code]);

  const handlePlayer = () => {
    async function playerJoin() {
      const uniqueId = await getDeviceId();
      await updateDoc(doc(db, "games", code), {
        [`users.${uniqueId}.playerNum`]: settingPlayer,
        settingPlayer: settingPlayer + 1,
      });
      setMyPlayerNum(settingPlayer);
    }
    playerJoin();
  };

  if (!startGame) {
    return null;
  }

  if (settingPlayer > maxPlayers) {
    return null;
  }

  if (myPlayerNum) {
    return null;
  }

  return (
    <View style={{ margin: 10 }}>
      <Button title={"Player " + settingPlayer} onPress={handlePlayer} />
    </View>
  );
};

export default PlayerButton;
