import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Home, Scan, Profile } from "./components/Pages";
import Header from "./components/Header";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import HomeNavigation from "./components/Navigation/HomeNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabNavigation from "./components/Navigation/TabNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <Header />
      </SafeAreaView>
      <TabNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
