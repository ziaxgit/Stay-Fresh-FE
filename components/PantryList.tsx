import { StyleSheet, FlatList, Text, View, ScrollView } from "react-native";

import ItemCard from "./ItemCard";
import React from "react";
import { useState } from "react";

type pantryListProps = {
  currentList: {
    name: string;
    expiryDate: number;
  }[];
};
const PantryList: React.FC<pantryListProps> = (props: pantryListProps) => {
  return (
    <FlatList
      data={props.currentList}
      renderItem={({ item }) => {
        return <ItemCard name={item.name} expiryDate={item.expiryDate} />;
      }}
    />
  );
};

export default PantryList;
