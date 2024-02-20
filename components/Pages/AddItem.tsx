import React, { useState, useEffect } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  // const [itemExpiry, setItemExpiry] = useState("");
  const [date, setDate] = useState(new Date());

  const onChangeDate = (event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    setDate(currentDate || new Date());
  };

  return (
    <View className="px-4">
      <Text className="text-2xl text-center m-2 mb-4 font-semibold">
        Add new item
      </Text>
      <View className="bg-lime-400 p-4 rounded-2xl shadow-md">
        <Text className="text-xl mb-1 font-medium">Item name</Text>
        <TextInput
          className="py-3 px-2 bg-slate-200 rounded-md mb-4 "
          onChangeText={setItemName}
          value={itemName}
          placeholder="Enter item name"
        />
        <Text className="text-xl mb-1 font-medium">Expiry date</Text>
        <View className="flex flex-row items-start">
          {/* <TextInput
            className="py-3 px-2 bg-slate-200 rounded-md mb-4"
            onChangeText={setItemExpiry}
            value={itemExpiry}
            placeholder="Select expiry date"
          /> */}
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            // is24Hour={true}
            onChange={onChangeDate}
            display="spinner"
          />
        </View>
      </View>
      {<Text>selected: {date.toISOString().split("T")[0]}</Text>}
      <View className="flex-row justify-center">
        <TouchableOpacity
          className="w-2/6 mt-8 items-center overflow-hidden"
          onPress={() => {}}
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
