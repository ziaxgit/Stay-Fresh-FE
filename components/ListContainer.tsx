import { StyleSheet, Button, Text, View } from "react-native";
import React from "react";
import PantryList from "./PantryList";
import itemsData from "./ItemsData.json";

const ListContainer = () => {
  return (
    <View>
      <Text>Your Home Pantry!</Text>
      <Button title="Add Items" />
      <PantryList />
    </View>
  );
};

export default ListContainer;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    padding: 23,
    flex: 1,
  },
});
