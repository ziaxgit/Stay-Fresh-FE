import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { useState } from "react";

type ItemProp = { name: string; expiryDate: number };

const ItemCard = ({ name, expiryDate }: ItemProp) => {
  const [newExpiryDate, setNewExpiryDate] = useState<string>(
    expiryDate.toString()
  );
  function increaseExpDate() {
    const convertExpDate = Number(newExpiryDate) + 1;
    setNewExpiryDate(convertExpDate.toString());
  }
  function decreaseExpDate() {
    const convertExpDate = Number(newExpiryDate) - 1;
    if (convertExpDate >= 0) setNewExpiryDate(convertExpDate.toString());
    else setNewExpiryDate("0");
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
        defaultValue={expiryDate.toString()}
        value={newExpiryDate}
        onChangeText={setNewExpiryDate}
        keyboardType="numeric"
      />
      <Button title="-" onPress={decreaseExpDate} />

      {/* {currentExpireryDate} days */}
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
