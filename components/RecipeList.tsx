import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getRecipes } from "./Utils/apiCalls";
import RecipeCard from "./RecipeCard";

type RecipeProp = { recipeItems: { item_id: number; item_name: string }[] };

export default function RecipeList({ recipeItems }: RecipeProp) {
  const [recipeList, setRecipeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  let ingreds = "";
  if (recipeItems.length > 0) {
    for (let i = 0; i < recipeItems.length; i++) {
      ingreds += recipeItems[i].item_name + " ";
    }
  }

  useEffect(() => {
    getRecipes(ingreds)
      .then((result) => {
        setRecipeList(result.hits);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        setError(err.message);
      });
  }, [ingreds]);
  if (isError)
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  if (isLoading)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  return (
    <View>
      <Text>Suggested Recipes Using: {ingreds}</Text>
      {recipeList.length > 0 ? (
        <FlatList
          className="bg-green-400 rounded-b-lg py-2"
          data={recipeList}
          renderItem={({ item }) => {
            return <RecipeCard recipe={item.recipe} />;
          }}
          ListFooterComponent={<View style={{ height: 10 }} />}
        />
      ) : (
        <Text>There are no recipes using these ingredients</Text>
      )}
    </View>
  );
}
