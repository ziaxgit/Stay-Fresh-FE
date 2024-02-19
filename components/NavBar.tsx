import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const NavBar = ({ navigation }) => {
  return (
    <Ionicons
      name="home"
      size={24}
      color="black"
      onPress={() => navigation.navigate("NewPage")}
    />
  );
};
export default NavBar;
