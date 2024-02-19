import { StyleSheet, Text, View } from "react-native";
import React from "react";
const NewPage = () => {
  return (
    <View>
      <Text style={styles.header}>Next Page!</Text>
    </View>
  );
};

export default NewPage;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    padding: 23,
    flex: 1,
    //justifyContent: "center",
    // alignItems: "center",
  },
});
