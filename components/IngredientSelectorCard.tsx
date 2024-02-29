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
  itemId: number;
  itemName: string;
  checkedItems: object[];
  setCheckedItems: (arg) => void;
}

const IngredientSelectorCard = (props: IngredientSelectProps) => {
  const setCheckedItems = props.setCheckedItems;
  const [isChecked, setIsChecked] = useState(false);

  function handleChecked() {
    setIsChecked(!isChecked);

    if (!isChecked){
      setCheckedItems((checkedItems) => {
        const newCheckedItems = [
          ...checkedItems,
          { item_id: props.itemId, item_name: props.itemName },
        ];
        return newCheckedItems;
      })}

       if (isChecked) {
         setCheckedItems((checkedItems) => {

          console.log("checked items if is checked>> ",checkedItems)
           const currentCheckedItems = [
             ...checkedItems];

             const newCheckedItems = []

             for (let i = 0; i < currentCheckedItems.length; i++){
              if (currentCheckedItems[i].item_id !== props.itemId) {
                newCheckedItems.push(currentCheckedItems[i]);
              }
             }


           return newCheckedItems;
         });
       }




  }

  return (
    <View>
      <CheckBox
        title={props.itemName}
        checked={isChecked}
        onPress={handleChecked}
      />
    </View>
  );
};

export default IngredientSelectorCard;
