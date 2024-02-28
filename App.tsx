import { SafeAreaView } from "react-native";
import Header from "./components/Header";
import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import TabNavigation from "./components/Navigation/TabNavigation";
import registerNNPushToken from "native-notify";
import useAuth from "./components/Navigation/hooks/useAuth";
import StackAuthNavigation from "./components/Navigation/StackAuthNavigation";

export default function App() {
  registerNNPushToken(19886, "XyPpv0RDBMlSVdjdRZ2Lz8");
  const { appUser } = useAuth();
  if (!appUser) {
    return (
      <NavigationContainer>
        <SafeAreaView>
          <Header />
          <Text className="font-medium shadow-gray-700 italic text-sm text-center -mt-1 ">
            Your Penny Saving Grocery Companion
          </Text>
        </SafeAreaView>
        <StackAuthNavigation />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <SafeAreaView>
          <Header />
        </SafeAreaView>
        <TabNavigation />
      </NavigationContainer>
    );
  }
}
