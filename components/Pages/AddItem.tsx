import React, { useState } from "react";
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

interface ItemToAdd {
  item_name: string;
  item_price: number;
  purchase_date: string;
  expiry_date: string;
  home_id: number;
}

const AddItem = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [itemName, setItemName] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [itemPrice, setItemPrice] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChangeDate = (_event: any, selectedDate: any) => {
    setExpiryDate(selectedDate);
  };
  const addToList = () => {
    const currentDate = new Date();

    const priceInPence = parseFloat(itemPrice) * 100;

    const itemToAdd: ItemToAdd = {
      item_name: itemName,
      item_price: priceInPence,
      purchase_date: currentDate.toString(),
      expiry_date: expiryDate.toString(),
      home_id: 1,
    };
    console.log(itemToAdd.item_price);
    if (itemToAdd.item_name === "" || isNaN(priceInPence)) {
      alert("Missing fields found. Please fill in all fields.");
    } else {
      postItemByHomeId(itemToAdd)
        .then(({ data }) => {
          Alert.alert("Item successfully added", undefined, [
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
    }
  };

  return (
    <ScrollView className="px-4 mb-2">
      <Text className="text-2xl text-center m-2 mb-4 font-semibold">
        Add new item
      </Text>
      <View className="bg-green-400 p-4 rounded-2xl shadow-md">
        <Text className="text-xl mb-1 font-medium">Item name</Text>
        <TextInput
          className="py-3 px-2 bg-slate-100 rounded-md mb-2 "
          onChangeText={setItemName}
          value={itemName}
          placeholder="Enter item name"
        />
        <Text className="text-xl mb-1 font-medium">Item price</Text>
        <TextInput
          className="py-3 px-2 bg-slate-100 rounded-md mb-2 "
          onChangeText={setItemPrice}
          value={itemPrice}
          placeholder="£ Enter price in pounds"
          keyboardType="decimal-pad"
          returnKeyType="done"
        />
        <Text className="text-xl mb-1 font-medium">Expiry date</Text>
        <View className="flex flex-row items-start bg-slate-100 rounded-md">
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
        className="mt-2 bg-green-700 rounded-full "
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
