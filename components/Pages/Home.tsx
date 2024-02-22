import { StyleSheet, Button, Text, View } from "react-native";
import React, { useEffect } from "react";
import PantryList from "../PantryList";
import itemsData from "../ItemsData.json";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
export type RootStackParamList = {
  Home: { itemToAdd?: {} };
  AddItem: undefined;
  EditList: object;
};

const Home = ({ route }: any) => {
  const itemToAdd = route.params?.itemToAdd;
  const [currentList, setCurrentList] = useState(itemsData.groceryItems);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (itemToAdd !== undefined) {
      setCurrentList((prevState: any) => {
        return [...prevState, itemToAdd];
      });
    }
  }, [itemToAdd]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 20, textAlign: "center", paddingBottom: 10 }}>
        Your current items
      </Text>
      <Button
        title="Add Item"
        onPress={() => {
          navigation.navigate("AddItem");
        }}
      />
      <Button
        title="Edit List"
        onPress={() => {
          navigation.navigate("EditList", { currentList });
        }}
      />
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

export default Home;

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
