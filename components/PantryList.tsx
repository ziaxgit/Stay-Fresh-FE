import { StyleSheet, FlatList, Text, View, ScrollView } from "react-native";
import React from "react";
import itemsData from "./ItemsData.json";
import ItemCard from "./ItemCard";

const PantryList = () => {
  return (
    <View>
      <View style={styles.container}>
        <FlatList
          data={itemsData.groceryItems}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <ItemCard name={item.name} expiryDate={item.expiryDate} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PantryList;

const styles = StyleSheet.create({
  container: {},
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
