// if add days and then remove days back to origin then save changes should disapear
// error handling
// make the number text field editable

import {
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

import { deleteItem } from "./Utils/apiCalls";
import { patchItemById } from "./Utils/apiCalls";

interface editListProps {
  currentList: [];
  setCurrentList: (arg: object[]) => void;
  item_name: string;
  expiry_date: number;
  setIsItemChanged: (arg: boolean) => void;
  item: { item_name: string; expiry_date: number; item_id: number };
  onExpiryDateChange: (arg: number) => void;
}

const ItemCard = (props: editListProps) => {
  const {
    currentList,
    setCurrentList,
    item_name,
    expiry_date,
    item,
    onExpiryDateChange,
    setIsItemChanged,
  } = props;

  const currentDate = Date.now();
  const formattedExpiryDate = Date.parse(expiry_date.toString());
  const daysToExpire =
    Math.floor(
      (Number(formattedExpiryDate) - currentDate) / 1000 / 60 / 60 / 24
    ) + 1;

  const [newDaysToExpire, setNewDaysToExpire] = useState(
    daysToExpire.toString()
  );
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [hasBeenChanged, setHasBeenChanged] = useState(false);
  const [updatedExpiryDate, setUpdatedExpiryDate] = useState(
    item.expiry_date.toString()
  );

  function editExpiryDate(change: number) {
    setNewDaysToExpire((Number(newDaysToExpire) + change).toString());

    const expiryDateToChange = new Date(updatedExpiryDate);
    const newDate = new Date(
      expiryDateToChange.setDate(expiryDateToChange.getDate() + change)
    );

    setUpdatedExpiryDate(newDate.toString());
    setHasBeenChanged(true);
  }

  // function increaseExpDate() {
  //   // const convertExpDate = Number(newExpiryDate) + 1;
  //   // setNewExpiryDate(convertExpDate.toString());
  //   // onExpiryDateChange(convertExpDate);
  //   // setIsItemChanged(true);
  //   // setHasBeenChanged(true);
  // }
  // function decreaseExpDate() {
  //   // const convertExpDate = Number(newExpiryDate) - 1;
  //   // if (convertExpDate >= 0) {
  //   //   setNewExpiryDate(convertExpDate.toString());
  //   //   setHasBeenChanged(true);
  //   //   onExpiryDateChange(convertExpDate);
  //   // } else setNewExpiryDate("0");
  //   // setIsItemChanged(true);
  //   // setHasBeenChanged(true);
  // }

  function handleDeleteItem() {
    deleteItem(item.item_id)
      .then((data) => {
        setIsDeleted(true);
        setIsError(false);
        setIsItemChanged(true);
      })
      .catch((error) => {
        setIsDeleted(false);
        setError(error.response.data.msg);
        setIsError(true);
      });
  }

  function handleSave() {
    patchItemById(item.item_id, { expiry_date: updatedExpiryDate })
      .then((response) => {
        setHasBeenChanged(false);
      })
      .catch((err) => console.log(err));
  }

  function handleTypedDays(days){
    // if(Number(days) < 0){
    //   return
    // }

    // console.log(days.memoizedProps.text);
    // console.log(days.memoizedProps.value);
    // console.log(days["nativeEvent"]["text"], "<<< days[nativeEvent][text]");



    // console.log(Object.keys(days), "<< keys days");
    //     console.log(Object.keys(days.target), "<< keys days target");


    // setNewDaysToExpire(days.toString());

    // const change = Number(days) - daysToExpire;

    //   const expiryDateToChange = new Date(updatedExpiryDate);
    //   const newDate = new Date(
    //     expiryDateToChange.setDate(expiryDateToChange.getDate() + change)
    //   );

    //   setUpdatedExpiryDate(newDate.toString());
    // setHasBeenChanged(true);

  }

  if (isDeleted)
    return (
      <View className="flex-row px-4 py-2 bg-red-700 rounded-2xl shadow-md mx-2 my-2 flex-wrap">
        <Text className="text-white">Item has been deleted</Text>
      </View>
    );

  return (
    <View>
      <View className="flex-row justify-between px-4 py-1 bg-white rounded-2xl shadow-md mx-2 my-2 flex-wrap">
        <View className="flex-row gap-1 items-center ">
          <TouchableOpacity onPress={handleDeleteItem}>
            <AntDesign name="delete" size={30} color="red" />
            {/* <MaterialIcons name="delete-forever" size={35} color="red" /> */}
          </TouchableOpacity>
          <Text className="text-xl font-medium">{item_name}</Text>
        </View>

        <View className="flex-row gap-1 items-center ">
          <TouchableOpacity
            onPress={() => {
              editExpiryDate(1);
            }}
          >
            <Ionicons name="add-circle-outline" size={40} color="green" />
          </TouchableOpacity>

          <TextInput
            className="text-lg font-medium text-center leading-6 pb-1 h-8 w-10  bg-gray-200 rounded-md"
            value={newDaysToExpire.toString()}
            onSubmitEditing={(event) => {
              handleTypedDays(event);
            }}
            onChangeText={(typedNum) => {
              setNewDaysToExpire(typedNum.toString());
            }}
            // onEndEditing={(something)=>{console.log("something >>> ", something["nativeEvent"]["text"]);}}
            onBlur={()=>{console.log("blur")}}
            keyboardType="numeric"
            readOnly={false}
            returnKeyType="done"
          />

          <TouchableOpacity
            onPress={() => {
              editExpiryDate(-1);
            }}
            disabled={Number(newDaysToExpire) > 0 ? false : true}
          >
            <Feather name="minus-circle" size={35} color="#d6881a" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {hasBeenChanged ? (
          <Button title="Save Changes" onPress={handleSave} />
        ) : null}
      </View>
      {isError ? <Text>{error}</Text> : null}
    </View>
  );
};

export default ItemCard;
