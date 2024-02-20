import { StyleSheet, FlatList, Text, View, ScrollView } from "react-native";

import ItemCard from "./ItemCard";
import React from "react";
import { useState } from "react";
interface pantryListProps {
  currentList: Object;
}
const PantryList: React.FC<pantryListProps> = ({ currentList }: any) => {
  return (
    <FlatList
      data={currentList}
      renderItem={({ item }) => {
        return <ItemCard name={item.name} expiryDate={item.expiryDate} />;
      }}
    />
  );
};

export default PantryList;
