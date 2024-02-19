import { StyleSheet, FlatList, Text, View } from "react-native";
import React from "react";

const PantryList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { name: "Milk", expiryDate: "2024-03-01" },
          { name: "Bread", expiryDate: "2024-02-25" },
          { name: "Eggs", expiryDate: "2024-03-05" },
          { name: "Apples", expiryDate: "2024-02-28" },
          { name: "Bananas", expiryDate: "2024-03-03" },
          { name: "Chicken Breast", expiryDate: "2024-03-10" },
          { name: "Spinach", expiryDate: "2024-02-27" },
          { name: "Tomatoes", expiryDate: "2024-03-02" },
          { name: "Pasta", expiryDate: "2024-03-15" },
          { name: "Rice", expiryDate: "2024-03-20" },
          { name: "Cheese", expiryDate: "2024-03-08" },
          { name: "Yogurt", expiryDate: "2024-03-12" },
          { name: "Ground Coffee", expiryDate: "2024-04-01" },
          { name: "Olive Oil", expiryDate: "2024-03-25" },
          { name: "Canned Beans", expiryDate: "2024-04-05" },
          { name: "Cereal", expiryDate: "2024-03-18" },
          { name: "Orange Juice", expiryDate: "2024-03-07" },
          { name: "Salmon", expiryDate: "2024-03-14" },
          { name: "Potatoes", expiryDate: "2024-03-30" },
          { name: "Onions", expiryDate: "2024-03-04" },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </View>
  );
};

export default PantryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
