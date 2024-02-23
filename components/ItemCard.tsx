import { Text, View } from "react-native";
import React from "react";

type ItemProp = { item_name: string; expiryDate: number };

const ItemCard = ({ item_name, expiryDate }: ItemProp) => {
  const currentDate = Date.now();
  const formattedExpiryDate = Date.parse(expiryDate.toString());
  let newExpiryDate = Number(formattedExpiryDate) - currentDate;
  newExpiryDate = Math.floor(newExpiryDate / 1000 / 60 / 60 / 24);
  return (
    <View className="flex-row justify-between items-center px-4 py-2 bg-white rounded-2xl shadow-md mx-2 my-2">
      <Text className="text-xl font-normal">{item_name}</Text>
      <Text className="text-xl font-normal">{newExpiryDate} days</Text>
    </View>
  );
};

export default ItemCard;
