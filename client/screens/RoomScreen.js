import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AppState,
  InteractionManager,
  Text,
  StatusBar,
} from "react-native";
//import styles from "../utils/style";
import { db } from "../utils/firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import * as Brightness from "expo-brightness";
import styles from "../utils/style";
import { getDeviceId } from "../utils/useSecureStore";
import ColorPicker from "../components/ColorPicker";
import HamburgerMenu from "../components/HamburgerMenu";
import TurnButton from "../components/TurnButton";
import YourTurn from "../components/YourTurn";
import PixelPerson from "../components/PixelPerson";

const RoomScreen = ({ route }) => {
  const { code, maxPlayers, myTurnNum } = route.params;

  const [backgroundColor, setBackgroundColor] = useState("#D2B48C");
  const [colorChosen, setColorChosen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [myTurn, setMyTurn] = useState(false);
  const brightnessValue = useRef(1);

  //Inactivity Code
  const [inactive, setInactive] = useState(false);
  const INACTIVITY_LIMIT = 15000;
  const timeoutId = useRef(null);

  const getBrightness = async () => {
    brightnessValue.current = await Brightness.getSystemBrightnessAsync();
    console.log("Brightness: " + brightnessValue.current);
  };

  const setAndSaveBrightness = async (newBrightness) => {
    await getBrightness();
    Brightness.setBrightnessAsync(newBrightness);
  };

  //Handle brightness
  useEffect(() => {
    (async () => {
      await Brightness.requestPermissionsAsync();
    })();
    getBrightness();
  }, []);

  const handleTap = () => {
    console.log("Tap");
    clearTimeout(timeoutId.current);
    setInactive(false);
    Brightness.setBrightnessAsync(brightnessValue.current);
    timeoutId.current = setTimeout(() => {
      setInactive(true);
      setAndSaveBrightness(0);
    }, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    if (!inactive) {
      timeoutId.current = setTimeout(() => {
        setInactive(true);
        setAndSaveBrightness(0);
      }, INACTIVITY_LIMIT);
    }

    return () => {
      clearTimeout(timeoutId.current);
      Brightness.setBrightnessAsync(brightnessValue.current);
    };
  }, [inactive]);

  //End inactivity code

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
            handleTap();
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
    <>
      <StatusBar hidden={true} />
      <TouchableWithoutFeedback onPress={handleTap}>
        <View
          style={[
            styles.container,
            styles.fill,
            { backgroundColor: backgroundColor },
          ]}
        >
          {!colorChosen && (
            <ColorPicker updateColor={handleUpdateColor}></ColorPicker>
          )}
          {colorChosen && (
            <View style={[styles.fill]}>
              <HamburgerMenu
                style={[styles.hamburger, { zIndex: 9, elevation: 9 }]}
                menuSelect={handleMenuSelect}
                code={code}
              ></HamburgerMenu>
              <PixelPerson></PixelPerson>
              {myTurn && (
                <View>
                  <View
                    style={[
                      styles.buttonRow,
                      { marginTop: 50, zIndex: 0, elevation: -1 },
                    ]}
                  >
                    <TurnButton
                      setTurn={handleSetTurn}
                      direction={-1}
                    ></TurnButton>
                    <TurnButton
                      setTurn={handleSetTurn}
                      direction={1}
                    ></TurnButton>
                  </View>
                  <YourTurn></YourTurn>
                </View>
              )}
            </View>
          )}
          <TouchableOpacity
            onPress={handleTap}
            style={[
              styles.fill,
              {
                elevation: inactive ? 1 : -2,
                zIndex: inactive ? 2 : -2,
                backgroundColor: inactive ? "#000000" : "#00000000",
              },
            ]}
          ></TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default RoomScreen;
