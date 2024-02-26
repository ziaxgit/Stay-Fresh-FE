import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Header from "./components/Header";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
