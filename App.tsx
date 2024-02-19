import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import NewPage from "./components/NewPage";
import Home from "./components/Pages/Home";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const homeName = "home";
const newpage = "NewPage";

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            }
            return <Ionicons name={homeName} component={Home}></Ionicons>;
          },
        })}
      >
        <Tab.Screen name={homeName} component={Home} />
      </Tab.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Stay Fresh" }} // re-titling the page name
        />
        <Stack.Screen name="NewPage" component={NewPage} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
