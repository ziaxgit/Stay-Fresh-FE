import React, { useEffect, useState } from "react";
import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import addDaysToDate from "../Utils/addDaysToDate";
import DateTimePicker from "@react-native-community/datetimepicker";

const ScannedItemCard = ({ eachItem, setItemsByAi, index }: any) => {
  const { itemName, daysToExpiry, price } = eachItem;
  const [expiryDate, setExpiryDate] = useState(addDaysToDate(daysToExpiry));
  const [finalPrice, setFinalPrice] = useState(price);
  const [finalItemName, setFinalItemName] = useState(itemName);

  const onChangeDate = (event: any, selectedDate: any) => {
    setExpiryDate(selectedDate);
  };

  const itemToAdd = {
    item_name: finalItemName,
    item_price: Math.ceil(Number(finalPrice) * 100),
    purchase_date: new Date().toString(),
    expiry_date: expiryDate.toString(),
    home_id: 1,
  };

  useEffect(() => {
    setItemsByAi((currentItems: any) => {
      const newArray = [...currentItems];
      newArray.splice(index, 1, itemToAdd);
      return newArray;
    });
  }, [finalItemName, finalPrice, expiryDate]);

  return (
    <View className="flex-row justify-between items-center pr-2 pl-3 py-1 bg-white rounded-2xl shadow-md mx-2 my-1 flex-wrap">
      <MaterialIcons name="delete-forever" size={25} color="red" />
      <View
        style={{
          borderBottomWidth: 1,
          backgroundColor: "#ebebeb",
          borderBottomColor: "black",
          padding: 4,
          flexWrap: "wrap",
          marginRight: 10,
        }}
      >
        <TextInput
          className="w-32"
          value={String(finalItemName)}
          onChangeText={(newName) => {
            setFinalItemName(newName);
          }}
        />
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          backgroundColor: "#ebebeb",
          borderBottomColor: "black",
          padding: 4,
        }}
      >
        <TextInput
          className="w-10 text-center"
          value={String(finalPrice)}
          onChangeText={(newPrice) => {
            setFinalPrice(newPrice);
          }}
          keyboardType="numeric"
          returnKeyType="done"
        />
      </View>
      <View className="">
        <DateTimePicker
          testID="dateTimePicker"
          value={expiryDate}
          onChange={onChangeDate}
        />
      </View>
    </View>
  );
};

export default ScannedItemCard;
