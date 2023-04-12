import React, { useState, useEffect } from "react";
import { View } from "react-native";
//import styles from "../utils/style";
import { db } from "../utils/firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import styles from "../utils/style";
import { getDeviceId } from "../utils/useSecureStore";
import ColorPicker from "../components/ColorPicker";
import HamburgerMenu from "../components/HamburgerMenu";
import TurnButton from "../components/TurnButton";
import YourTurn from "../components/YourTurn";

const RoomScreen = ({ route }) => {
  const { code, maxPlayers, myTurnNum } = route.params;

  const [backgroundColor, setBackgroundColor] = useState("#D2B48C");
  const [colorChosen, setColorChosen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [myTurn, setMyTurn] = useState(false);

  useEffect(() => {
    async function getDocInfo() {
      const docRef = doc(db, "games", code);
      const uniqueId = await getDeviceId();
      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setCurrentPlayer(doc.data().currentPlayer);
          const playerInfo = doc.data().users[`${uniqueId}`];
          console.log(
            "CP: " +
              currentPlayer +
              " | " +
              doc.data().currentPlayer +
              ", " +
              myTurnNum +
              " | " +
              playerInfo.playerNum
          );
          if (doc.data().currentPlayer == myTurnNum) {
            setMyTurn(true);
          } else {
            setMyTurn(false);
          }
        }
      });
      return unsubscribe;
    }
    getDocInfo();
  }, []);

  const handleUpdateColor = (color) => {
    setBackgroundColor(color);
    setColorChosen(true);
  };

  const handleMenuSelect = (option) => {
    switch (option) {
      case "color":
        setColorChosen(false);
        break;
    }
  };

  const handleSetTurn = (direction) => {
    let newTurn = currentPlayer + direction;
    if (newTurn > maxPlayers) {
      newTurn = 1;
    }
    if (newTurn < 1) {
      newTurn = maxPlayers;
    }
    console.log("Changing turn from " + currentPlayer + " to " + newTurn);
    updateDoc(doc(db, "games", code), {
      currentPlayer: newTurn,
    });
    setCurrentPlayer(newTurn);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {!colorChosen && (
        <ColorPicker updateColor={handleUpdateColor}></ColorPicker>
      )}
      {colorChosen && (
        <View style={[styles.fill]}>
          <HamburgerMenu
            style={[styles.hamburger, { zIndex: 1, elevation: 1 }]}
            menuSelect={handleMenuSelect}
            code={code}
          ></HamburgerMenu>
          {myTurn && (
            <View>
              <View
                style={[
                  styles.buttonRow,
                  { marginTop: 50, zIndex: 0, elevation: -1 },
                ]}
              >
                <TurnButton setTurn={handleSetTurn} direction={-1}></TurnButton>
                <TurnButton setTurn={handleSetTurn} direction={1}></TurnButton>
              </View>
              <YourTurn></YourTurn>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default RoomScreen;
