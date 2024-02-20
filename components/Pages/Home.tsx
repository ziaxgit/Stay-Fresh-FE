import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../Header";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListContainer from "../ListContainer";
const Tab = createBottomTabNavigator();

const Home = () => {
  return <ListContainer />;
};

export default Home;
