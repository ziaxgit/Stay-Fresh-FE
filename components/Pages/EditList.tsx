import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "./Home";
import EditItemCard from "../EditItemCard";

const EditList = ({ route }: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentList, setCurrentList } = route.params;

  const [isItemChanged, setIsItemChanged] = useState(false);
  const [visibleList, setVisibleList] = useState(currentList);
  function handleExpiryDateChange(index: number, newExpiryDate: number) {
    const stupidList = [...visibleList];
    stupidList[index] = {
      name: visibleList[index].name,
      expiryDate: newExpiryDate,
    };
    setVisibleList(stupidList);
  }
  function removeItem(index: number) {
    setVisibleList((currentItems: object[]) => {
      return currentItems.filter((_, itemIndex) => itemIndex !== index);
    });
  }
  function saveNewList() {
    setCurrentList(visibleList);
    navigation.navigate("Home", {});
  }
  return (
    <View className="flex-1">
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          paddingBottom: 10,
          backgroundColor: "white",
          fontWeight: "bold",
        }}
      >
        Edit Your List
      </Text>

      <FlatList
        scrollEnabled={true}
        className="pt-4 bg-green-400 pb-2 rounded-b-xl"
        data={visibleList}
        renderItem={({ item, index }) => {
          return (
            <View style={{ zIndex: 1 }}>
              <EditItemCard
                name={item.name}
                expiryDate={item.expiryDate}
                item={item}
                currentList={currentList}
                setCurrentList={setCurrentList}
                setIsItemChanged={setIsItemChanged}
                onExpiryDateChange={(newExpiryDate) => {
                  handleExpiryDateChange(index, newExpiryDate);
                }}
              />
              <Button
                title="Delete"
                onPress={() => {
                  removeItem(index);
                  setIsItemChanged(true);
                }}
              />
            </View>
          );
        }}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
      {isItemChanged && (
        <View>
          <Text className="text-lg p-2 text-center font-bold text-red-500 ">
            Your list has been changed
          </Text>
          <TouchableOpacity className="bg-green-700 p-3" onPress={saveNewList}>
            <Text className="text-xl text-center font-bold text-white">
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default EditList;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    padding: 23,
    flex: 1,
  },
});
