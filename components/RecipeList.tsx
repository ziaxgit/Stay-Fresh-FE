import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getRecipes } from "./Utils/apiCalls";
import RecipeCard from "./RecipeCard";

type RecipeProp = { recipeItems: { item_id: number; item_name: string }[] };

export default function RecipeList({ recipeItems }: RecipeProp) {


    const [recipeList, setRecipeList] = useState([]);


  let ingreds = "";
  for (let i = 0; i < recipeItems.length; i++) {
    ingreds += recipeItems[i].item_name + " ";
  }
  useEffect(() => {
    getRecipes(ingreds)
      .then((result) => {
        setRecipeList(result.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  
  return (
    <View>
      <Text>Recipe List</Text>
      <FlatList
        className="bg-green-400 rounded-b-lg py-2"
        data={recipeList}
        renderItem={({ item }) => {
          return <RecipeCard recipe={item.recipe} />;
        }}
        ListFooterComponent={<View style={{ height: 10 }} />}
      />
    </View>
  );
}
