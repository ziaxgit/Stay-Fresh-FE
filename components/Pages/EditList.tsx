import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "./Home";
import EditItemCard from "../EditItemCard";

const EditList = ({ route }: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentList } = route.params;

  const { setCurrentList } = route.params;
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
    navigation.navigate("Home");
  }
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          paddingBottom: 10,
          backgroundColor: "white",
        }}
      >
        Edit Your List
      </Text>
      <FlatList
        data={visibleList}
        renderItem={({ item, index }) => {
          return (
            <View style={{ display: "flex", position: "relative", zIndex: 1 }}>
              <EditItemCard
                name={item.name}
                expiryDate={item.expiryDate}
                item={item}
                currentList={currentList}
                setCurrentList={setCurrentList}
                onExpiryDateChange={(newExpiryDate) => {
                  handleExpiryDateChange(index, newExpiryDate);
                }}
              />
              <Button
                title="Delete"
                onPress={() => {
                  removeItem(index);
                }}
              />
            </View>
          );
        }}
      />
      <Button title="Save" onPress={saveNewList} />
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
