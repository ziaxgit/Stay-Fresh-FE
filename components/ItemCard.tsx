import { Text, View } from "react-native";
import React from "react";

type ItemProp = { item_name: string; expiryDate: number; purchaseDate: number };

const ItemCard = ({ item_name, expiryDate, purchaseDate }: ItemProp) => {
  const formattedPurchaseDate = Date.parse(purchaseDate.toString());
  const currentDate = Date.now();
  const formattedExpiryDate = Date.parse(expiryDate.toString());
  let totalShelfLife =
    Number(formattedExpiryDate) - Number(formattedPurchaseDate);
  totalShelfLife = Math.floor(totalShelfLife / 1000 / 60 / 60 / 24);
  let numDaysRemaining = Number(formattedExpiryDate) - currentDate;
  numDaysRemaining = Math.floor(numDaysRemaining / 1000 / 60 / 60 / 24) + 1;
  const percentageShelfLifeRemaining = numDaysRemaining / totalShelfLife;

  if (numDaysRemaining <= 2 || percentageShelfLifeRemaining <= 0.05)
    return (
      <View className="flex-row justify-between items-center px-4 py-2 bg-red-700 rounded-2xl shadow-md mx-2 my-1">
        <Text className="text-lg font-medium text-white">{item_name}</Text>
        <Text className="text-lg font-medium text-white">
          {numDaysRemaining} days
        </Text>
      </View>
    );
  else if (
    (0.05 < percentageShelfLifeRemaining &&
      percentageShelfLifeRemaining <= 0.1) ||
    (numDaysRemaining > 2 && numDaysRemaining <= 4)
  )
    return (
      <View className="flex-row justify-between items-center px-4 py-2 bg-amber-500 rounded-2xl shadow-md mx-2 my-1">
        <Text className="text-lg font-medium text-white">{item_name}</Text>
        <Text className="text-lg font-medium text-white">
          {numDaysRemaining} days
        </Text>
      </View>
    );
  else
    return (
      <View className="flex-row justify-between items-center px-4 py-2 bg-green-700 rounded-2xl shadow-md mx-2 my-1">
        <Text className="text-lg font-medium text-white">{item_name}</Text>
        <Text className="text-lg font-medium text-white">
          {numDaysRemaining} days
        </Text>
      </View>
    );
};

export default ItemCard;
