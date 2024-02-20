import { StyleSheet, Button, Text, View } from "react-native";
import React, { useEffect } from "react";
import PantryList from "./PantryList";
import itemsData from "./ItemsData.json";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
type RootStackParamList = {
  Home: undefined;
  AddItem: object;
};
const ListContainer = () => {
  const [currentList, setCurrentList] = useState(itemsData.groceryItems);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Button
        title="Add Item"
        onPress={() => {
          navigation.navigate("AddItem", {
            currentList,
            setCurrentList,
          });
        }}
      />
      <Text style={{ fontSize: 20, textAlign: "center", paddingBottom: 10 }}>
        Your current items
      </Text>
      <View style={styles.ItemListHeading}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Name
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Expires in
        </Text>
      </View>
      <PantryList currentList={currentList} />
    </View>
  );
};

export default ListContainer;

const styles = StyleSheet.create({
  ItemListHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "orange",
  },
});
