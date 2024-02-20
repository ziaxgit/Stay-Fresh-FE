import { StyleSheet, Button, Text, View } from "react-native";
import React from "react";
import PantryList from "./PantryList";

const ListContainer = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Button title="Add Items" />
      <Text style={{ fontSize: 20, textAlign: "center", paddingBottom: 10 }}>
        Your current items
      </Text>
      <View style={styles.ItemListHeading}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Name
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Expires in
        </Text>
      </View>
      <PantryList />
    </View>
  );
};

export default ListContainer;

const styles = StyleSheet.create({
  ItemListHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "orange",
  },
});
