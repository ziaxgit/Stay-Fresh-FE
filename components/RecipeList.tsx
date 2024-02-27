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
import { getRecipes } from "./Utils/apiCalls";

type RecipeProp = { recipeItems: { item_id: number; item_name: string }[] };

export default function RecipeList({ recipeItems }: RecipeProp) {
  let ingreds = "";
  for (let i = 0; i < recipeItems.length; i++) {
    ingreds += recipeItems[i].item_name + " ";
  }
  useEffect(() => {
    getRecipes(ingreds)
      .then((result) => {
        console.log("here");
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <View>
      <Text>{recipeItems[0].item_name}</Text>
    </View>
  );
}
