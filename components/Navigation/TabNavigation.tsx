import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Home, Scan, Profile } from "../Pages";
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
        tabBarShowLabel: true,
        tabBarStyle: {
          padding: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home-main"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={28} />
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
            <MaterialIcons name="document-scanner" color={color} size={28} />
          ),
          unmountOnBlur: true,
        }}
        component={Scan}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={28} />
          ),
          unmountOnBlur: true, //resets stack
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
