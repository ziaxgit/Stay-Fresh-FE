import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import RecipeList from "../RecipeList";
import { useIsFocused } from "@react-navigation/native";
import { getAllItemsByHomeId } from "../Utils/apiCalls";
import IngredientSelector from "../IngredientSelector";
export default function RecipesSelector() {
  const isFocused = useIsFocused();
  const [currentList, setCurrentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [recipeItems, setRecipeItems] = useState([]);
  const [selectIngredients, setSelectIngredients] = useState(false);
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
  function handleSelectIngredients() {
    setSelectIngredients(!selectIngredients);
  }
  return (
    <View className="flex-1">
      {isLoading ? (
        <ActivityIndicator size={30} />
      ) : (
        <View className="flex-1 bg-gray-50">
          <Button
            title={selectIngredients ? "View Recipes" : "Select Ingredients"}
            onPress={handleSelectIngredients}
          />
          {!selectIngredients ? (
            <RecipeList recipeItems={recipeItems} />
          ) : (
            <IngredientSelector
              currentList={currentList}
              setRecipeItems={setRecipeItems}
              setSelectIngredients={setSelectIngredients}
            />
          )}
        </View>
      )}
    </View>
  );
}
