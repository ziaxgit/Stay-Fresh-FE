import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Home, Scan, Profile } from "./components/Pages";
import Header from "./components/Header";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Header />
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
            name="Home"
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" color={color} size={28} />
              ),
            }}
            component={Home}
          />
          <Tab.Screen
            name="Scan"
            options={{
              tabBarLabel: "Scan",
              tabBarIcon: ({ color }) => (
                <MaterialIcons
                  name="document-scanner"
                  color={color}
                  size={28}
                />
              ),
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
            }}
            component={Profile}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
