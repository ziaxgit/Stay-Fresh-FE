import {
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import PantryList from "../PantryList";
import itemsData from "../ItemsData.json";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
export type RootStackParamList = {
  Home: { itemToAdd?: {} };
  AddItem: undefined;
  EditList: {
    currentList: { name: string; expiryDate: number }[];
    setCurrentList: (
      currentList: { name: string; expiryDate: number }[]
    ) => void;
  };
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
    <View className="flex-1">
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Text className="font-medium shadow-gray-700 italic text-base text-center -my-q ">
          Your Eco-Friendly Grocery Companion
        </Text>
        <View className="border-b-2 border-gray-300 rounded-b-md ">
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              paddingTop: 10,
              borderBottomWidth: 5,
              borderColor: "red",
              fontWeight: "bold",
            }}
          >
            Current Items
          </Text>
        </View>
        <View style={styles.ItemListHeading}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Item Name
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
      <View className="flex flex-row justify-around my-2">
        <TouchableOpacity
          className="rounded-full bg-green-700 px-3 py-2"
          onPress={() => {
            navigation.navigate("AddItem");
          }}
        >
          <Text className="text-lg text-white font-medium  ">Add an item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-orange-500 rounded-full px-3 py-2"
          onPress={() => {
            navigation.navigate("EditList", { currentList, setCurrentList });
          }}
        >
          <Text className="text-lg text-white font-medium">Edit your list</Text>
        </TouchableOpacity>
      </View>
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
    borderBottomColor: "#ccc",
    backgroundColor: "white",
  },
});
