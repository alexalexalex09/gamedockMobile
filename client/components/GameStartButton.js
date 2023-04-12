import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase"; // assuming you have initialized your Firebase app and exported the Firestore instance as 'db'
import { getDeviceId } from "../utils/useSecureStore";

const GameStartButton = ({ code }) => {
  if (code == null) {
    return <Text>Error: No code parameter</Text>;
  }
  const [gameData, setGameData] = useState(null);
  const [myId, setMyId] = useState(null);

  // Get the current user's device ID when the component mounts
  useEffect(() => {
    async function fetchDeviceId() {
      const id = await getDeviceId();
      setMyId(id);
    }
    fetchDeviceId();
  }, []);

  // Get the game data from Firestore when the component mounts
  useEffect(() => {
    async function fetchGameData() {
      const gameRef = doc(db, "games", code);
      const gameDoc = await getDoc(gameRef);
      if (gameDoc.exists()) {
        setGameData(gameDoc.data());
      }
    }
    fetchGameData();
  }, [code]);

  // Check if the current user's device ID matches the owner ID of the game
  const isOwner = gameData && myId === gameData.owner.id;

  const handleStartGame = async () => {
    updateDoc(doc(db, "games", code), {
      startGame: true,
      currentPlayer: 1,
    });
  };

  return (
    <>
      {isOwner && (
        <View style={{ margin: 10 }}>
          <Button title="Start the Game" onPress={handleStartGame} />
        </View>
      )}
    </>
  );
};

export default GameStartButton;
