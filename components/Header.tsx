import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.image} source={require("../assets/app-logo.png")} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingHorizontal: 10,
    // marginBottom: -10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  image: {
    marginTop: -10,
    marginBottom: -10,
    width: 300,
    resizeMode: "contain",
  },
});
