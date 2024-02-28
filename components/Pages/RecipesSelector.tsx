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
import { useIsFocused } from "@react-navigation/native";
import { getAllItemsByHomeId } from "../Utils/apiCalls";

export default function RecipesSelector() {
  const isFocused = useIsFocused();
  const [currentList, setCurrentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [recipeItems, setRecipeItems] = useState([]);
  useEffect(() => {
    getAllItemsByHomeId("active")
      .then(({ data }) => {
        setCurrentList(data.items);
      })
      .catch((err) => {
        setIsError(true);
        setError(err.response.data.msg);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentList.length > 0) {
      setRecipeItems([currentList[0], currentList[1], currentList[2]]);
      setIsLoading(false);
    }
  }, [currentList]);

  return (
    <View>
      <Text>This is the recipe selector</Text>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <View>
          <RecipeList recipeItems={recipeItems} />
        </View>
      )}
    </View>
  );
}
