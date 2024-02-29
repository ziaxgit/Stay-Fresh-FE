import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from "../Pages/LogIn";
import ForgotPassword from "../Pages/ForgotPassword";

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
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
