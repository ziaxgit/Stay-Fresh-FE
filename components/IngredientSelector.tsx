import { Text, View, FlatList, ScrollView, Button } from "react-native";
import React, { useState } from "react";
import IngredientSelectorCard from "./IngredientSelectorCard";
import { CheckBox } from "react-native-elements";
type ItemsListProp = {
  currentList: { item_id: number; item_name: string }[];
  setRecipeItems: (arg) => void;
  setSelectIngredients: (arg) => void;
};
export default function IngredientSelector({
  currentList,
  setRecipeItems,
  setSelectIngredients,
}: ItemsListProp) {
  const [checkedItems, setCheckedItems] = useState([]);

  function handleSetItems() {
    setRecipeItems(checkedItems);
    setSelectIngredients(false);
  }

  return (
    <View>
      <Button title="Set Items" onPress={handleSetItems} />
      <FlatList
        data={currentList}
        renderItem={({ item }) => {
          return (
            <View>
              <IngredientSelectorCard
                itemName={item.item_name}
                itemId={item.item_id}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
