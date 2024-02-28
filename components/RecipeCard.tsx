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

} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { getRecipes } from "./Utils/apiCalls";

type RecipeProp = { recipe: {label: string, url: string, images: {THUMBNAIL: {url: string, width: number, height: number}}}};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  logo: {
    width: 66,
    height: 58,
  },
});


export default function RecipeCard({recipe}: RecipeProp) {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(recipe.url);

    if (supported) {
      await Linking.openURL(recipe.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${recipe.url}`);
    }
  }, [recipe.url]);

  return (
    <View>
      <Text>{recipe.label}</Text>
      <Button title={"Open Recipe"} onPress={handlePress} />
      <Image
        style={styles.tinyLogo}
        source={{
          uri: recipe.images.THUMBNAIL.url,
        }}
      />
    </View>
  );
}
