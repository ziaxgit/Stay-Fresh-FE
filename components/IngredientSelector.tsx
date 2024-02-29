import {
  Text,
  View,
  FlatList,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import IngredientSelectorCard from "./IngredientSelectorCard";
import { CheckBox } from "react-native-elements";
type ItemsListProp = {
  currentList: { item_id: number; item_name: string }[];
  setRecipeItems: (arg) => void;
  setSelectIngredients: (arg) => void;
  setIngredientChecked: (arg) => void;
};
export default function IngredientSelector({
  currentList,
  setRecipeItems,
  setSelectIngredients,
  setIngredientChecked,
}: ItemsListProp) {
  const [checkedItems, setCheckedItems] = useState([]);
  const [itemsSelected, setItemsSelected] = useState(false);

  useEffect(() => {
    console.log("checked items >>>", checkedItems);
    if (checkedItems.length > 0) {
      setItemsSelected(true);
      setIngredientChecked(true);
    } else {
      setItemsSelected(false);
      setIngredientChecked(false);
    }
  }, [checkedItems]);

  function handleSetItems() {
    setRecipeItems(checkedItems);
    setSelectIngredients(false);
    setIngredientChecked(false);
  }

  return (
    <View>
      {itemsSelected ? (
        <View className="content-center py-5 ">
          <TouchableOpacity
            className="rounded-full bg-green-600  px-20 mx-2"
            onPress={handleSetItems}
          >
            <Text className="text-lg text-white font-medium text-center">
              Set Items
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* <Button title="Set Items" onPress={handleSetItems} color="red" /> */}
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
