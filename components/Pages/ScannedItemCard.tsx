import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import addDaysToDate from "../Utils/addDaysToDate";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ScannedItemCard = ({
  eachItem,
  setItemsByAi,
  index,
  setDeleteIndexes,
}: any) => {
  const { itemName, daysToExpiry, price } = eachItem;
  const [expiryDate, setExpiryDate] = useState(addDaysToDate(daysToExpiry));
  const [finalPrice, setFinalPrice] = useState(price);
  const [finalItemName, setFinalItemName] = useState(itemName);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isValueChanged, setIsValueChanged] = useState({
    itemName: false,
    price: false,
    expiryDate: false,
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    hideDatePicker();
    setExpiryDate(date);
    setIsValueChanged({
      ...isValueChanged,
      expiryDate: true,
    });
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

  useEffect(() => {
    if (isDelete) {
      setDeleteIndexes((currentIndexes: any) => {
        return [...currentIndexes, index];
      });
    }
  }, [isDelete]);

  if (isDelete) {
    return null;
  }

  return (
    <View className="flex-row items-center justify-between px-3 py-2 bg-white rounded-2xl shadow-md mx-2 my-1 flex-wrap">
      <TouchableOpacity onPress={() => setIsDelete(true)}>
        <MaterialIcons name="delete-forever" size={26} color="red" />
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: 1,
          backgroundColor: `${isValueChanged.itemName ? `#fab561` : `#ebebeb`}`,
          borderBottomColor: "black",
          padding: 4,
          flexWrap: "wrap",
        }}
      >
        <TextInput
          className="w-32"
          value={String(finalItemName)}
          onChangeText={(newName) => {
            setFinalItemName(newName);
            setIsValueChanged({
              ...isValueChanged,
              itemName: true,
            });
          }}
        />
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          backgroundColor: `${isValueChanged.price ? `#fab561` : `#ebebeb`}`,
          borderBottomColor: "black",
          padding: 4,
          marginLeft: 5,
        }}
      >
        <TextInput
          className="w-10 text-center "
          value={String(finalPrice)}
          onChangeText={(newPrice) => {
            setFinalPrice(newPrice);
            setIsValueChanged({
              ...isValueChanged,
              price: true,
            });
          }}
          keyboardType="numeric"
          returnKeyType="done"
        />
      </View>

      <View className="flex-row">
        <TextInput
          className="text-center ml-3 p-1"
          style={{
            borderBottomWidth: 1,
            backgroundColor: `${
              isValueChanged.expiryDate ? `#fab561` : `#ebebeb`
            }`,
            borderBottomColor: "black",
          }}
          value={expiryDate.toLocaleDateString("en-GB")}
          readOnly={true}
        />
        <TouchableOpacity
          className="ml-1"
          onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
        >
          <MaterialIcons name="edit-calendar" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        minimumDate={new Date()}
        display="inline"
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default ScannedItemCard;
