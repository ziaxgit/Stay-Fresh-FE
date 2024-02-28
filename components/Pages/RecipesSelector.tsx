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
  console.log("inside recipe selector");
  useEffect(() => {
    console.log("inside recipe selector - useEffect");
    //if (isFocused) {
    getAllItemsByHomeId("active")
      .then(({ data }) => {
        //console.log("we have gotten all items here");
        //setIsLoading(false);
        setCurrentList(data.items);
        setIsLoading(false);
      })
      // .then((data) => {
      //   ;
      // })
      .catch((err) => {
        setIsError(true);
        setError(err.response.data.msg);
        setIsLoading(false);
      });
    //}
  }, []);

  if (currentList.length > 0) {
    useEffect(() => {
      setRecipeItems([currentList[0], currentList[1], currentList[2]]);
    }, []);
  }

  if (isLoading)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  else
    return (
      <View>
        <Text>This is recipe selector</Text>

        <RecipeList recipeItems={recipeItems} />
      </View>
    );
}
