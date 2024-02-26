import React, { useState } from "react";
import { View, Text } from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";

const ScannedItemCard = ({ eachItem }: any) => {
  const eachItemModified = {
    ...eachItem,
    purchaseDate: new Date().toString(),
  };
  const { itemName, daysToExpiry, price, purchaseDate } = eachItemModified;

  return (
    <View className="flex-row justify-between px-4 py-1 bg-white rounded-2xl shadow-md m-2 flex-wrap">
      <View className="flex-row gap-1 items-center">
        <MaterialIcons name="delete-forever" size={30} color="red" />
        <Text className="text-lg">{itemName}</Text>
      </View>
      <View className="flex-row items-center justify-evenly ">
        <Text className="text-lg">{daysToExpiry} days</Text>
        <Ionicons name="add-circle-outline" size={40} color="green" />
        <Feather name="minus-circle" size={35} color="#d6881a" />
      </View>
    </View>
  );
};

export default ScannedItemCard;
