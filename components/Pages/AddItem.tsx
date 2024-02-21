import React, { useState, useEffect } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./Home";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const AddItem = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [itemName, setItemName] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());

  const onChangeDate = (event: any, selectedDate: any) => {
    setExpiryDate(selectedDate);
  };

  const addToList = () => {
    const currentDate = new Date();
    const differenceInMilliseconds =
      expiryDate.getTime() - currentDate.getTime();

    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    const itemToAdd = {
      name: itemName,
      expiryDate: differenceInDays + 1,
    };
    navigation.navigate("Home", {
      itemToAdd,
    });
  };

  return (
    <View className="px-4">
      <Text className="text-2xl text-center m-2 mb-4 font-semibold">
        Add new item
      </Text>
      <View className="bg-lime-400 p-4 rounded-2xl shadow-md">
        <Text className="text-xl mb-1 font-medium">Item name</Text>
        <TextInput
          className="py-3 px-2 bg-slate-100 rounded-md mb-4 "
          onChangeText={setItemName}
          value={itemName}
          placeholder="Enter item name"
        />
        <Text className="text-xl mb-1 font-medium">Expiry date</Text>
        <View className="flex flex-row items-start bg-slate-100 rounded-md">
          <DateTimePicker
            testID="dateTimePicker"
            value={expiryDate}
            onChange={onChangeDate}
            display="spinner"
          />
        </View>
      </View>
      {}
      <View className="flex-row justify-center">
        <TouchableOpacity
          className="w-2/6 mt-8 items-center overflow-hidden"
          onPress={addToList}
        >
          <Text
            style={{
              borderRadius: 10,
              padding: 10,
              overflow: "hidden",
              backgroundColor: "#0398fc",
              color: "white",
              fontSize: 20,
            }}
          >
            Add Items
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddItem;
