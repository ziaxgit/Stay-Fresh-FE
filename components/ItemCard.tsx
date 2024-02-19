import { StyleSheet, Button, Text, View } from "react-native";
import React from "react";

type ItemProp = { name: string; expiryDate: number };

const ItemCard = ({ name, expiryDate }: ItemProp) => {
  return (
    <View style={styles.item}>
      <Text
        style={{
          fontSize: 16,
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          fontSize: 16,
        }}
      >
        {expiryDate} days
      </Text>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 5,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    paddingVertical: 10,
  },
});
