import { FlatList } from "react-native";
import { View } from "react-native";
import ItemCard from "./ItemCard";
import React from "react";

type pantryListProps = {
  currentList: {
    name: string;
    expiryDate: number;
  }[];
};
const PantryList: React.FC<pantryListProps> = (props: pantryListProps) => {
  return (
    <FlatList
      className="bg-green-400 rounded-b-lg py-2"
      data={props.currentList}
      renderItem={({ item }) => {
        return <ItemCard name={item.name} expiryDate={item.expiryDate} />;
      }}
      ListFooterComponent={<View style={{ height: 10 }} />}
    />
  );
};

export default PantryList;
