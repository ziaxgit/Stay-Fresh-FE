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
  Alert,
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
  const [itemStatus, setItemStatus] = useState("active");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [hasBeenChanged, setHasBeenChanged] = useState(false);
  const [currentDaysToExpire, setCurrentDaysToExpire] = useState(daysToExpire);
  const [updatedExpiryDate, setUpdatedExpiryDate] = useState(
    item.expiry_date.toString()
  );

  if (hasBeenChanged === true) {
    if (Number(newDaysToExpire) === currentDaysToExpire) {
      setHasBeenChanged(false);
    }
  }

  function editExpiryDate(change: number) {
    setNewDaysToExpire((Number(newDaysToExpire) + change).toString());

    const expiryDateToChange = new Date(updatedExpiryDate);
    const newDate = new Date(
      expiryDateToChange.setDate(expiryDateToChange.getDate() + change)
    );
    setUpdatedExpiryDate(newDate.toString());
    setHasBeenChanged(true);
  }

  function handleItemStatusChange(status: string) {
    const updatedItem = { item_status: status };
    patchItemById(item.item_id, updatedItem).catch((error) => {
      setItemStatus("active");
      setError(error.response.data.msg);
      setIsError(true);
    });
  }

  function handleItemUsage() {
    Alert.alert(
      "Please select an option",
      undefined,
      [
        {
          text: "Item Consumed",
          onPress: () => {
            handleItemStatusChange("USED");
            setItemStatus("used");
          },
        },
        {
          text: "Item Binned",
          onPress: () => {
            handleItemStatusChange("TRASHED");
            setItemStatus("trashed");
          },
        },
        {
          text: "Remove Item From List",
          onPress: () => {
            handleDeleteItem();
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  function handleDeleteItem() {
    deleteItem(item.item_id)
      .then((data) => {
        setItemStatus("deleted");
        setIsError(false);
      })
      .catch((error) => {
        setItemStatus("active");
        setError(error.response.data.msg);
        setIsError(true);
      });
  }

  function handleSave() {
    patchItemById(item.item_id, { expiry_date: updatedExpiryDate })
      .then((response) => {
        setHasBeenChanged(false);
        setCurrentDaysToExpire(Number(newDaysToExpire));
      })
      .catch((err) => {
        setError(err.response.data.msg);
        setIsError(true);
      });
  }

  function handleTypedDays(event: any) {
    if (event["nativeEvent"]["text"] < 0) {
      setNewDaysToExpire(currentDaysToExpire.toString());
      return;
    }
    const changeInDays = Number(newDaysToExpire) - currentDaysToExpire;
    const expiryDateToChange = new Date(updatedExpiryDate);
    const newDate = new Date(
      expiryDateToChange.setDate(expiryDateToChange.getDate() + changeInDays)
    );
    setUpdatedExpiryDate(newDate.toString());
    setHasBeenChanged(true);
  }

  if (itemStatus === "deleted")
    return (
      <View className="flex-row px-4 py-2 bg-red-700 rounded-2xl shadow-md mx-2 my-2 flex-wrap">
        <Text className="text-white">Item has been deleted</Text>
      </View>
    );
  if (itemStatus === "used")
    return (
      <View className="flex-row px-4 py-2 bg-red-700 rounded-2xl shadow-md mx-2 my-2 flex-wrap">
        <Text className="text-white">Item has been consumed</Text>
      </View>
    );
  if (itemStatus === "trashed")
    return (
      <View className="flex-row px-4 py-2 bg-red-700 rounded-2xl shadow-md mx-2 my-2 flex-wrap">
        <Text className="text-white">Item has been thrown away</Text>
      </View>
    );

  return (
    <View>
      <View className="flex-row justify-between px-4 py-1 bg-white rounded-2xl shadow-md mx-2 my-2 flex-wrap">
        <View className="flex-row gap-1 items-center ">
          <TouchableOpacity onPress={handleItemUsage}>
            <AntDesign name="delete" size={30} color="red" />
            {/* <MaterialIcons name="delete-forever" size={33} color="red" /> */}
          </TouchableOpacity>
          <Text className="text-lg font-medium ">{item_name}</Text>
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
            onChangeText={(typedNum) => {
              setNewDaysToExpire(typedNum.toString());
            }}
            onEndEditing={(event) => {
              handleTypedDays(event);
            }}
            inputMode="numeric"
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
      {hasBeenChanged ? (
        <TouchableOpacity
          onPress={handleSave}
          className="p-2 bg-zinc-700 mx-32 rounded-full"
        >
          <Text className="text-white text-center font-medium">
            {" "}
            Save Changes{" "}
          </Text>
        </TouchableOpacity>
      ) : null}
      {isError ? <Text>{error}</Text> : null}
    </View>
  );
};

export default ItemCard;
