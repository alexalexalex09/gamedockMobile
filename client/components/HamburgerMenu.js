import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../utils/style";

const HamburgerMenu = ({ code, menuSelect }) => {
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  const handleChangeColor = () => {
    menuSelect("color");
  };

  const handleExit = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.hamburgerContainer}>
      <Modal visible={isMenuOpen} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.hamburgerMenu}>
          <Text style={styles.hamburgerText}>Code: {code}</Text>
          <TouchableOpacity onPress={handleChangeColor}>
            <Text style={styles.menuOption}>Change Color</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleExit}>
            <Text style={styles.menuOption}>Exit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity onPress={toggleMenu}>
        <View style={[styles.hamburgerIcon, styles.rounded]}>
          <Ionicons name="ios-menu" size={32} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HamburgerMenu;
