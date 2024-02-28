import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import PantryList from "../PantryList";
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { getAllItemsByHomeId } from "../Utils/apiCalls";
export type RootStackParamList = {
  Home: { itemToAdd?: {} };
  AddItem: undefined;
  SignUp: undefined;
  LogIn: undefined;
  EditList: {
    currentList: { name: string; expiryDate: number }[];
    setCurrentList: (
      currentList: { name: string; expiryDate: number }[]
    ) => void;
  };
};
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Home = ({ route }: any) => {
  const isFocused = useIsFocused();
  const itemToAdd = route.params?.itemToAdd;
  const [currentList, setCurrentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    if (isFocused) {
      getAllItemsByHomeId("active")
        .then(({ data }) => {
          setCurrentList(data.items);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          setError(err.response.data.msg);
          setIsLoading(false);
        });
    }
  }, [isFocused]);

  useEffect(() => {
    if (itemToAdd !== undefined) {
      getAllItemsByHomeId("active")
        .then(({ data }) => {
          setCurrentList(data.items);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          setError(err.response.data.msg);
          setIsLoading(false);
        });
    }
  }, [itemToAdd]);

  return (
    <View className="flex-1">
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Text className="font-medium shadow-gray-700 italic text-sm text-center -mt-1 ">
          Your Penny Saving Grocery Companion
        </Text>
        <View className="border-b-2 border-green-400 rounded-b-md ">
          <Text
            className="text-gray-600"
            style={{
              fontSize: 20,
              textAlign: "center",
              paddingTop: 10,
              paddingBottom: 5,
              fontWeight: "bold",
            }}
          >
            Current Items
          </Text>
        </View>
        <View style={styles.ItemListHeading}>
          <Text
            className="text-gray-600"
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Item Name
          </Text>
          <Text
            className="text-gray-600"
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Expires in
          </Text>
        </View>
        {isLoading ? (
          <View className="items-center gap-2">
            <ActivityIndicator size={"large"} color={"red"} />
            <Text className="text-lg">Getting your items...</Text>
          </View>
        ) : isError ? (
          <Text>{error}</Text>
        ) : currentList.length === 0 ? (
          <Text className="text-center text-lg mx-4">
            Your list is currently empty
          </Text>
        ) : (
          <PantryList currentList={currentList} />
        )}
      </View>
      <View className="flex flex-row justify-around my-2">
        <TouchableOpacity
          className="rounded-full bg-gray-700 px-3 py-2"
          onPress={() => {
            navigation.navigate("AddItem");
          }}
        >
          <View className="flex-row items-center gap-1">
            <Entypo name="add-to-list" size={24} color="white" />
            <Text className="text-lg text-white font-medium  ">
              Add an item
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-amber-800 rounded-full px-3 py-2"
          onPress={() => {
            navigation.navigate("EditList", { currentList, setCurrentList });
          }}
        >
          <View className="flex-row items-center">
            <MaterialIcons name="edit-note" size={28} color="white" />
            <Text className="text-lg text-white font-medium">
              Edit your list
            </Text>
          </View>
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
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
});
