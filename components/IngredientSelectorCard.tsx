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
import { CheckBox } from "react-native-elements";
import { useState } from "react";

interface IngredientSelectProps {
  // currentList: [];
  // setCurrentList: (arg: object[]) => void;
  itemId: number;
  itemName: string;
  checkedItems: object[];
  setCheckedItems: (arg) => void;
  // expiry_date: number;
  // item: { item_name: string; expiry_date: number; item_id: number };
  // onExpiryDateChange: (arg: number) => void;
}

const IngredientSelectorCard = (props: IngredientSelectProps) => {
  const setCheckedItems = props.setCheckedItems;
  const [isChecked, setIsChecked] = useState(false);
  function handleChecked() {
    setIsChecked(!isChecked);
    if (!isChecked)
      setCheckedItems((checkedItems) => {
        console.log(checkedItems, "<----");
        const newCheckedItems = [
          ...checkedItems,
          { item_id: props.itemId, item_name: props.itemName },
        ];
        return newCheckedItems;
      });
  }
  return (
    <View>
      <Text>{props.itemName}</Text>
      <CheckBox
        title="Select Item"
        checked={isChecked}
        onPress={handleChecked}
      />
    </View>
  );
};

export default IngredientSelectorCard;
