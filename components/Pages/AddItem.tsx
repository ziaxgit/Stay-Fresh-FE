import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./Home";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { postItemByHomeId } from "../Utils/apiCalls";

const AddItem = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [itemName, setItemName] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [itemPrice, setItemPrice] = useState<string>("");
  const [alertShown, setAlertShown] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const onChangeDate = (event: any, selectedDate: any) => {
    setExpiryDate(selectedDate);
  };

  const addToList = () => {
    const currentDate = new Date();
    const itemToAdd = {
      item_name: itemName,
      item_price: itemPrice,
      purchase_date: currentDate.toString(),
      expiry_date: expiryDate.toString(),
      home_id: 1,
    };

    if (itemToAdd.item_name === "" || itemToAdd.item_price === "") {
      alert("Missing fields found. Please fill in all fields.");
    } else {
      postItemByHomeId(itemToAdd)
        .then(({ data }) => {
          Alert.alert("Item successfuly added", undefined, [
            {
              text: "Add Another Item",
              onPress: () => {
                setItemName("");
                setItemPrice("");
                setExpiryDate(new Date());
              },
            },
            {
              text: "Finished",
              onPress: () => {
                navigation.navigate("Home", {
                  itemToAdd,
                });
              },
            },
          ]);
          setIsError(false);
          return data;
        })
        .catch((err) => {
          setIsError(true);
          setError(err.response.data.msg);
        });
      setAlertShown(true);
    }
  };

  return (
    <ScrollView className="px-4 mb-2">
      <Text className="text-2xl text-center m-2 mt-4 font-semibold">
        Add new item
      </Text>
      <View className="p-4 rounded-2xl shadow-md">
        <Text className="text-lg mb-1 font-medium ml-2">Item name</Text>
        <TextInput
          className="py-3 px-3 bg-slate-100 rounded-lg mb-2"
          onChangeText={setItemName}
          value={itemName}
          placeholder="Enter item name"
        />
        <Text className="text-lg mb-1 font-medium ml-2">Item price</Text>
        <TextInput
          className="py-3 px-3 bg-slate-100 rounded-lg mb-2"
          onChangeText={setItemPrice}
          value={itemPrice}
          placeholder="Enter price in pence"
          inputMode="numeric"
          returnKeyType="done"
        />
        <Text className="text-lg mb-1 font-medium ml-2">Expiry date</Text>
        <View className="flex flex-row items-start bg-slate-100 rounded-xl">
          <DateTimePicker
            testID="dateTimePicker"
            value={expiryDate}
            onChange={onChangeDate}
            display="spinner"
            minimumDate={new Date()}
          />
        </View>
      </View>
      {isError ? <Text>{error}, please try again</Text> : null}
      <TouchableOpacity
        className="mt-2 bg-green-600 rounded-full"
        onPress={addToList}
      >
        <Text className="text-white text-lg text-center py-2 font-medium">
          Add Item
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddItem;
