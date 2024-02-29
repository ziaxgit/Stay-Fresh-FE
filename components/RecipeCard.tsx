import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  Linking,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { getRecipes } from "./Utils/apiCalls";

type RecipeProp = {
  recipe: {
    label: string;
    url: string;
    images: { THUMBNAIL: { url: string; width: number; height: number } };
  };
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    // width: 300,
    height: 200,
    resizeMode: "contain",
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default function RecipeCard({ recipe }: RecipeProp) {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(recipe.url);

    if (supported) {
      await Linking.openURL(recipe.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${recipe.url}`);
    }
  }, [recipe.url]);

  return (
    <View className="m-2 shadow-lg border- px-4 bg-white rounded-2xl border-gray-500">
      <Text className="text-center text-lg font-medium m-2">
        {recipe.label}
      </Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: recipe.images.REGULAR.url,
        }}
      />

      <View className="content-center py-5 ">
        <TouchableOpacity
          className="rounded-full bg-green-600  px-20 mx-2"
          onPress={handlePress}
        >
          <Text className="text-lg text-white font-medium text-center">
            {"Go To Recipe"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <Button title={"Open Recipe"} onPress={handlePress} /> */}
    </View>
  );
}
