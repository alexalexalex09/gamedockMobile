import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import styles from "../utils/style";
import { db } from "../utils/firebase";
import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import GameStartButton from "../components/GameStartButton";
import PlayerButton from "../components/PlayerButton";

const GameScreen = ({ route }) => {
  const { code } = route.params;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "games", code), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUsers(data.users || []);
        console.log("users:");
        console.log(data.users);
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
      <GameStartButton code={code}></GameStartButton>
      <PlayerButton code={code}></PlayerButton>
    </View>
  );
};

export default GameScreen;
