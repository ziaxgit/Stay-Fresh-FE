import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>🥦StayFresh🥦</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
