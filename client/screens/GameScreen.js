import React from "react";
import { Text, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";

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

  useEffect(() => {}, [users]);

  const Item = ({ title }) => (
    <View style={{ padding: 10 }}>
      <Text>{title}</Text>
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
    </View>
  );
};

export default GameScreen;
