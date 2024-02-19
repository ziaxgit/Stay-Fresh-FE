import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../Header";
import NavBar from "../NavBar";

const Home = ({ navigation }) => {
  return (
    <>
      <Header />
      <NavBar />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    padding: 23,
    flex: 1,
  },
});
