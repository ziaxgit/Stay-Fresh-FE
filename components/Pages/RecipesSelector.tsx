import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import RecipeList from "../RecipeList";

export default function RecipesSelector() {
  const [recipeItems, setRecipeItems] = useState([
    { item_id: 1, item_name: "chicken" },
    { item_id: 2, item_name: "carrots" },
    { item_id: 3, item_name: "eggs" },
  ]);
  return (
    <View>
      <Text>This is recipe selector</Text>
      <RecipeList recipeItems={recipeItems} />
    </View>
  );
}
