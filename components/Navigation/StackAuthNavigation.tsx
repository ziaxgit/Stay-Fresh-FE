import Home from "../Pages/Home";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddItem from "../Pages/AddItem";
import EditList from "../Pages/EditList";
import LogIn from "../Pages/LogIn";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import SignUp from "../Pages/SignUp";
import useAuth from "./hooks/useAuth";
const Stack = createNativeStackNavigator();

export default function StackAuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="LogIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
