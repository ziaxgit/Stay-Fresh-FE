import {
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { deleteItem } from "./Utils/apiCalls";

type ItemProp = { currentList: object; setCurrentList: object };

interface editListProps {
  currentList: [];
  setCurrentList: (arg: object[]) => void;
  item_name: string;
  expiry_date: number;
  setIsItemChanged: (arg: boolean) => void;
  item: { item_name: string; expiryDate: number; item_id: number };
  onExpiryDateChange: (arg: number) => void;
}

const ItemCard = (props: editListProps) => {
  const {
    currentList,
    setCurrentList,
    item_name,
    expiry_date,
    item,
    onExpiryDateChange,
    setIsItemChanged,
  } = props;

  const currentDate = Date.now();
  const formattedExpiryDate = Date.parse(expiry_date.toString());
  let daysToExpire =
    Math.floor(
      (Number(formattedExpiryDate) - currentDate) / 1000 / 60 / 60 / 24
    ) + 1;

  const [newExpiryDate, setNewExpiryDate] = useState(daysToExpire.toString());
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  function increaseExpDate() {
    const convertExpDate = Number(newExpiryDate) + 1;
    setNewExpiryDate(convertExpDate.toString());
    onExpiryDateChange(convertExpDate);
    setIsItemChanged(true);
  }
  function decreaseExpDate() {
    const convertExpDate = Number(newExpiryDate) - 1;
    if (convertExpDate >= 0) {
      setNewExpiryDate(convertExpDate.toString());

      onExpiryDateChange(convertExpDate);
    } else setNewExpiryDate("0");
    setIsItemChanged(true);
  }

  function handleDeleteItem() {
    deleteItem(item.item_id)
      .then((data) => {
        setIsDeleted(true);
        setIsError(false);
        setIsItemChanged(true);
      })
      .catch((error) => {
        setIsDeleted(false);
        setError(error.response.data.msg);
        setIsError(true);
      });
  }

  if (isDeleted)
    return (
      <View className="flex-row px-4 py-2 bg-red-700 rounded-2xl shadow-md mx-2 my-2 flex-wrap">
        <Text className="text-white">Item has been deleted</Text>
      </View>
    );

  return (
    <View>
      <View className="flex-row justify-between px-4 py-1 bg-white rounded-2xl shadow-md mx-2 my-2 flex-wrap">
        <View className="flex-row gap-2 items-center ">
          <TouchableOpacity onPress={handleDeleteItem}>
            <AntDesign name="delete" size={30} color="red" />
          </TouchableOpacity>
          <Text className="text-xl font-medium">{item_name}</Text>
        </View>

        <View className="flex-row gap-1 items-center ">
          <TouchableOpacity onPress={increaseExpDate}>
            <Ionicons name="add-circle-outline" size={40} color="green" />
          </TouchableOpacity>

          <TextInput
            className="text-lg font-medium text-center leading-6 pb-1 h-8 w-10  bg-gray-200 rounded-md"
            value={newExpiryDate.toString()}
            onChangeText={setNewExpiryDate}
            keyboardType="numeric"
            readOnly={true}
          />

          <TouchableOpacity onPress={decreaseExpDate}>
            <Feather name="minus-circle" size={35} color="#d6881a" />
          </TouchableOpacity>
        </View>
      </View>
      {isError ? <Text>{error}</Text> : null}
    </View>
  );
};

export default ItemCard;
