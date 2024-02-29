import {
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
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
    const copyVisibleList = [...visibleList];
    copyVisibleList[index] = {
      name: visibleList[index].name,
      expiryDate: newExpiryDate,
    };
    setVisibleList(copyVisibleList);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={110}
      className="flex-1"
    >
      <View className="border-b-2 border-green-400">
        <Text
          className="text-gray-600"
          style={{
            fontSize: 20,
            textAlign: "center",
            paddingBottom: 6,
            backgroundColor: "white",
            fontWeight: "bold",
          }}
        >
          Edit Your List
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
          Expires in (days)
        </Text>
      </View>
      <FlatList
        scrollEnabled={true}
        className="pt-2 pb-2 rounded-b-xl"
        data={visibleList}
        renderItem={({ item, index }) => {
          return (
            <View style={{ zIndex: 1 }}>
              <EditItemCard
                item_name={item.item_name}
                expiry_date={item.expiry_date}
                item={item}
                currentList={currentList}
                setCurrentList={setCurrentList}
                // setIsItemChanged={setIsItemChanged}
                onExpiryDateChange={(newExpiryDate) => {
                  handleExpiryDateChange(index, newExpiryDate);
                }}
              />
            </View>
          );
        }}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </KeyboardAvoidingView>
  );
};

export default EditList;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    padding: 23,
    flex: 1,
  },
  ItemListHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderBottomColor: "#ccc",
    backgroundColor: "white",
  },
});
