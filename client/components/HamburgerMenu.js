import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HamburgerMenu = ({ menuSelect }) => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleChangeColor = () => {
    menuSelect("color");
  };

  const handleExit = () => {
    navigation.navigate("Home");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: 5,
        left: 5,
      }}
    >
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons
          name="md-menu"
          size={24}
          color="black"
          style={{
            backgroundColor: "#fff",
            padding: 10,
          }}
        />
      </TouchableOpacity>
      {showMenu && (
        <View
          style={{
            position: "absolute",
            top: 45,
            left: 0,
            backgroundColor: "#fff",
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={handleChangeColor}>
            <Text>Change Color</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleExit}>
            <Text>Exit</Text>
          </TouchableOpacity>
          <Text style={{ marginLeft: 10 }}>Code: ABCDE</Text>
        </View>
      )}
    </View>
  );
};

export default HamburgerMenu;
