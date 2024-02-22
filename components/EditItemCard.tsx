import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";

type ItemProp = { currentList: object; setCurrentList: object };
interface editListProps {
  currentList: [];
  setCurrentList: (arg: object[]) => void;
  name: string;
  expiryDate: number;
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
  } = props;
  const [newExpiryDate, setNewExpiryDate] = useState(expiryDate.toString());
  function increaseExpDate() {
    const convertExpDate = Number(newExpiryDate) + 1;
    setNewExpiryDate(convertExpDate.toString());
    onExpiryDateChange(convertExpDate);
  }
  function decreaseExpDate() {
    const convertExpDate = Number(newExpiryDate) - 1;
    if (convertExpDate >= 0) {
      setNewExpiryDate(convertExpDate.toString());

      onExpiryDateChange(convertExpDate);
    } else setNewExpiryDate("0");
  }

  return (
    <View style={styles.item}>
      <Text
        style={{
          fontSize: 16,
        }}
      >
        {name}
      </Text>
      <Button title="+" onPress={increaseExpDate} />

      <TextInput
        style={{
          fontSize: 16,
        }}
        value={newExpiryDate.toString()}
        onChangeText={setNewExpiryDate}
        keyboardType="numeric"
      />
      <Button title="-" onPress={decreaseExpDate} />
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 3,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    paddingVertical: 10,
  },
});
