import { StyleSheet, FlatList, Text, View, ScrollView } from "react-native";
import itemsData from "./ItemsData.json";
import ItemCard from "./ItemCard";
import React from "react";

const PantryList = () => {
  return (
    <FlatList
      data={itemsData.groceryItems}
      renderItem={({ item }) => {
        return <ItemCard name={item.name} expiryDate={item.expiryDate} />;
      }}
    />
  );
};

export default PantryList;
