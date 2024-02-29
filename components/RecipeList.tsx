import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getRecipes } from "./Utils/apiCalls";
import RecipeCard from "./RecipeCard";
import { Entypo } from "@expo/vector-icons";

type RecipeProp = { recipeItems: { item_id: number; item_name: string }[] };

export default function RecipeList({ recipeItems }: RecipeProp) {
  const [recipeList, setRecipeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const displayIngreds = [];

  let ingreds = "";
  if (recipeItems.length > 0) {
    for (let i = 0; i < recipeItems.length; i++) {
      ingreds += recipeItems[i].item_name + " ";
      displayIngreds.push(recipeItems[i].item_name);
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
      <View className="items-center justify-center">
        <ActivityIndicator size={30} />
      </View>
    );
  return (
    <View className="flex-1">
      <View className="gap-1 px-4 items-center">
        <Text className="text-lg">Recipe suggestions based on</Text>
        <Text className="text-lg font-medium text-green-700 ">
          {displayIngreds.join(", ")}
        </Text>
      </View>
      {recipeList.length > 0 ? (
        <FlatList
          className="rounded-b-lg py-2 px-3"
          data={recipeList}
          renderItem={({ item }) => {
            return <RecipeCard recipe={item.recipe} />;
          }}
          ListFooterComponent={<View style={{ height: 10 }} />}
        />
      ) : (
        <View className="items-center justify-center mt-20">
          <Entypo name="emoji-sad" size={100} color="#5c5b5b" />
          <Text className="text-lg mt-4 text-center px-4">
            Sorry, we couldn't find any recipes with those ingredients
          </Text>
        </View>
      )}
    </View>
  );
}
