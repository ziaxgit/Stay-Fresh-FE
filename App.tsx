import { SafeAreaView } from "react-native";
import Header from "./components/Header";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
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
