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
      item_price: 199,
      purchase_date: currentDate.toString(),
      expiry_date: expiryDate.toString(),
      home_id: 1,
    };
    postItemByHomeId(itemToAdd)
      .then(({ data }) => {
        Alert.alert("Item successfuly added", undefined, [
          {
            text: "Add Another Item",
            onPress: () => {
              setItemName("");
              setItemPrice("0");
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
  };

  return (
    <ScrollView className="px-4">
      <Text className="text-2xl text-center m-2 mb-4 font-semibold">
        Add new item
      </Text>
      <View className="bg-green-400 p-4 rounded-2xl shadow-md">
        <Text className="text-xl mb-1 font-medium">Item name</Text>
        <TextInput
          className="py-3 px-2 bg-slate-100 rounded-md mb-4 "
          onChangeText={setItemName}
          value={itemName}
          placeholder="Enter item name"
        />
        <Text className="text-xl mb-1 font-medium">Item price</Text>
        <TextInput
          className="py-3 px-2 bg-slate-100 rounded-md mb-4 "
          onChangeText={setItemPrice}
          value={itemPrice}
          placeholder="Enter price in pence"
          inputMode="numeric"
          returnKeyType="done"
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
      {isError ? <Text>{error}, please try again</Text> : null}
      <View className="flex-row justify-center">
        <TouchableOpacity
          className="w-2/6 mt-8 items-center overflow-hidden "
          onPress={addToList}
        >
          <Text
            style={{
              borderRadius: 20,
              padding: 10,
              overflow: "hidden",
              backgroundColor: "#38a169",
              color: "white",
              fontSize: 20,
            }}
          >
            Add Item
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddItem;
