import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from "react";
import styles from "../utils/style";
import { db } from "../utils/firebase";
import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import GameStartButton from "../components/GameStartButton";
import PlayerButton from "../components/PlayerButton";

const GameScreen = ({ route }) => {
  const { code } = route.params;
  const [users, setUsers] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const maxPlayers = useRef(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "games", code), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUsers(data.users || []);
        setStartGame(data.startGame);
        setCurrentPlayer(data.currentPlayer);
        maxPlayers.current = Object.keys(doc.data().users).length;
      }
    });
    return () => unsubscribe();
  }, []);

  const handleStartGame = async () => {
    updateDoc(doc(db, "games", code), {
      startGame: true,
    });
  };

  const Item = ({ title }) => (
    <View style={{ padding: 10 }}>
      <Text>{title.username}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item}></Item>;

  return (
    <View>
      <Text>GameScreen</Text>
      <Text>Code: {code}</Text>
      <FlatList
        data={Object.values(users)}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {!startGame && <GameStartButton code={code}></GameStartButton>}
      {startGame && (
        <PlayerButton
          code={code}
          maxPlayers={maxPlayers.current}
          currentPlayer={currentPlayer}
        ></PlayerButton>
      )}
    </View>
  );
};

export default GameScreen;
