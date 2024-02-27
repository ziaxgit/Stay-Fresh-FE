import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Home, Scan, Profile } from "../Pages";
import RecipesSelector from "../Pages/RecipesSelector";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import HomeNavigation from "./HomeNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import App from "../../App";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {},
        tabBarActiveTintColor: "#15bb53",
        tabBarStyle: {
          // backgroundColor: "#7d7d7d",
          // borderTopLeftRadius: 30,
          // borderTopRightRadius: 30,
          paddingBottom: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home-main"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={30} />
          ),
          unmountOnBlur: true, //resets stack
        }}
        component={HomeNavigation}
      />
      <Tab.Screen
        name="Scan"
        options={{
          tabBarLabel: "Scan",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="document-scanner" color={color} size={35} />
          ),
          unmountOnBlur: true,
        }}
        component={Scan}
      />
      <Tab.Screen
        name="Recipes"
        options={{
          tabBarLabel: "Recipes",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="food-bank" color={color} size={40} />
          ),
          unmountOnBlur: true,
        }}
        component={RecipesSelector}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={35} />
          ),
          unmountOnBlur: true, //resets stack
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
