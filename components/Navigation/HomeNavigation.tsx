import Home from "../Pages/Home";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddItem from "../Pages/AddItem";

const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="AddItem" component={AddItem} />
    </Stack.Navigator>
  );
}
