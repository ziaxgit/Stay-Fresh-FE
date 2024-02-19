import { StyleSheet, Button, Text, View } from "react-native";
import React from "react";
import PantryList from "./PantryList";

type ItemProp = { name: string; expiryDate: string };

const ItemCard = ({ name, expiryDate }: ItemProp) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{expiryDate}</Text>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({});
