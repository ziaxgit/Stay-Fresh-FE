import { FlatList } from "react-native";
import { View } from "react-native";
import ItemCard from "./ItemCard";
import React from "react";
import PushNotification from "./PushNotification";

type pantryListProps = {
  currentList: {
    item_name: string;
    expiry_date: number;
    purchase_date: number;
  }[];
};
const PantryList: React.FC<pantryListProps> = (props: pantryListProps) => {
  return (
    <>
      <FlatList
        className="bg-green-400 rounded-b-lg py-2"
        data={props.currentList}
        renderItem={({ item }) => {
          return (
            <ItemCard
              item_name={item.item_name}
              expiryDate={item.expiry_date}
              purchaseDate={item.purchase_date}
            />
          );
        }}
        ListFooterComponent={<View style={{ height: 10 }} />}
      />
      <PushNotification currentList={props.currentList} />
    </>
  );
};

export default PantryList;
