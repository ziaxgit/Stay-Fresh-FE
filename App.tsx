import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Home, Scan, Profile } from "./components/Pages";
import Header from "./components/Header";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import HomeNavigation from "./components/Navigation/HomeNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabNavigation from "./components/Navigation/TabNavigation";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView>
      <NavigationContainer>
        <Header />
        <TabNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: true,
//         tabBarStyle: {
//           padding: 10,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         options={{
//           tabBarLabel: "Home",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="home" color={color} size={28} />
//           ),
//         }}
//         component={HomeNavigation}
//       />
//       <Tab.Screen
//         name="Scan"
//         options={{
//           tabBarLabel: "Scan",
//           tabBarIcon: ({ color }) => (
//             <MaterialIcons name="document-scanner" color={color} size={28} />
//           ),
//         }}
//         component={Scan}
//       />
//       <Tab.Screen
//         name="Profile"
//         options={{
//           tabBarLabel: "Profile",
//           tabBarIcon: ({ color }) => (
//             <FontAwesome name="user" color={color} size={28} />
//           ),
//         }}
//         component={Profile}
//       />
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// })
