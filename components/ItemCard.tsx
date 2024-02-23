import { Text, View } from "react-native";
import React from "react";

type ItemProp = { name: string; expiryDate: number };

const ItemCard = ({ name, expiryDate }: ItemProp) => {
  return (
    <View className="flex-row justify-between items-center px-4 py-2 bg-white rounded-2xl shadow-md mx-2 my-2">
      <Text className="text-xl font-normal">{name}</Text>
      <Text className="text-xl font-normal">{expiryDate} days</Text>
    </View>
  );
};

export default ItemCard;
