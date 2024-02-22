import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

type ItemProp = { currentList: object; setCurrentList: object };

interface editListProps {
  currentList: [];
  setCurrentList: (arg: object[]) => void;
  name: string;
  expiryDate: number;
  setIsItemChanged: (arg: boolean) => void;
  item: { name: string; expiryDate: number };
  onExpiryDateChange: (arg: number) => void;
}

const ItemCard = (props: editListProps) => {
  const {
    currentList,
    setCurrentList,
    name,
    expiryDate,
    item,
    onExpiryDateChange,
    setIsItemChanged,
  } = props;
  const [newExpiryDate, setNewExpiryDate] = useState(expiryDate.toString());
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

  return (
    <View className="flex-row justify-between items-center px-4 py-2 bg-white rounded-2xl shadow-md mx-2 ">
      <View>
        <Text className="text-xl font-medium">{name}</Text>
      </View>
      <View className="flex-row gap-1 ">
        <Pressable onPress={increaseExpDate}>
          <Ionicons name="add-circle-outline" size={40} color="green" />
        </Pressable>
        <TextInput
          className="text-lg font-medium text-center leading-6 pb-1 w-10  bg-gray-200 rounded-md"
          value={newExpiryDate.toString()}
          onChangeText={setNewExpiryDate}
          keyboardType="numeric"
          readOnly={true}
        />
        <Pressable onPress={decreaseExpDate}>
          <Feather name="minus-circle" size={35} color="salmon" />
        </Pressable>
      </View>
    </View>
  );
};

export default ItemCard;
