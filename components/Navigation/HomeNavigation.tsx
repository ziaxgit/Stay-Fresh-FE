import Home from "../Pages/Home";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddItem from "../Pages/AddItem";
import EditList from "../Pages/EditList";
import LogIn from "../Pages/LogIn";
import SignUp from "../Pages/SignUp";
const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="LogIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen name="EditList" component={EditList} />
    </Stack.Navigator>
  );
}
