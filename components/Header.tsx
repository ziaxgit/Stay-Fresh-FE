import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = () => {
  return (
    <>
      <View>
        <Text style={styles.header}>Stay Fresh, Stay Happy!</Text>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    padding: 23,
    flex: 1,
  },
});
