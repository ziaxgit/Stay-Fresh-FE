import React, { useState } from "react";
import {
  Button,
  Image,
  View,
  Text,
  Alert,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import OpenAI from "openai";
import ScannedItemCard from "./ScannedItemCard";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_KEY,
});

export default function Scan() {
  const [image, setImage] = useState<string | null>(null);
  const [alertShown, setAlertShown] = useState(false);
  const [texts, setTexts] = useState("");
  const [itemsByAi, setItemsByAi] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [showButton, setShowButton] = useState(true);

  const takePicture = async () => {
    try {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyseImage = async () => {
    setIsLoading(true);
    setShowButton(false);
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.EXPO_PUBLIC_OCR_KEY}`;

    try {
      const base64ImageData = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
          },
        ],
      };

      const apiResponse = await axios.post(apiURL, requestData);
      setTexts(apiResponse.data.responses[0].textAnnotations[0].description);
      const itemsByAiString = await callOpenAI(
        apiResponse.data.responses[0].textAnnotations[0].description
      );
      setIsLoading(false);
      console.log(itemsByAiString, "<<< original data");
      const parsedData = itemsByAiString && JSON.parse(itemsByAiString);
      console.log(parsedData, "<<< parsedData");
      setItemsByAi([...parsedData]);
    } catch (error) {
      console.error("Error analysing image: ", error);
      alert("Error analysing image. Please try again later.");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!alertShown) {
        Alert.alert(
          "Please select an option",
          undefined,
          [
            {
              text: "Scan Receipt",
              onPress: () => {
                takePicture();
                setAlertShown(true);
              },
            },
            {
              text: "Choose from Gallery",
              onPress: () => {
                pickImage();
                setAlertShown(true);
              },
            },
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => {
                setAlertShown(true);
              },
            },
          ],
          {
            cancelable: true,
            onDismiss: () =>
              Alert.alert(
                "This alert was dismissed by tapping outside of the alert dialog."
              ),
          }
        );
      }
    }, [alertShown])
  );

  const callOpenAI = async (scannedText: string) => {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            'You are an expert receipt scanner that is tasked with finding edible food items from a receipt. Given a list of text information, your job is to return a list of objects in JSON format with ONLY FOOD items from the text. \n\nYou must use your knowledge and information from the internet to figure out when a specific food item is likely to expire without any refrigeration.\n\nEach food item should should be an object with property "itemName", "price" and "daysToExpiry" as an estimated number of days before the item will expire e.g. 3 \n\nFor example given the data:\nTHE.SHOP\nNeura, IE #70823\nMilk 2.77\ncheese 6.4\nbutter 1.45\n\nYour response must look like: \n\n[\n  {\n    "itemName": "Milk",\n    "price": 2.77,\n    "daysToExpiry": 2\n  },\n  {\n    "itemName": "Cheese",\n    "price": 6.4,\n    "daysToExpiry": 7\n  },\n  {\n    "itemName": "Butter",\n    "price": 1.45,\n    "daysToExpiry": 10\n  }\n]\n\nNote, the response does not include "THE.SHOP\nNeura, IE #70823" as it\'s not a food item.\n\nDo not add any further information or text in your response as your response data will be converted into javascript code so additional text such as a note in your response will break the code.',
        },
        {
          role: "user",
          content: scannedText,
        },
      ],
      temperature: 1,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const scannedAiItems = response.choices[0].message.content;
    return scannedAiItems;
  };

  console.log(itemsByAi);

  const items = [
    {
      itemName: "Milk",
      price: "1.99",
      purchaseDate: new Date().toString(),
      expiryDate: new Date(
        new Date().getTime() + 2 * 24 * 60 * 60 * 1000
      ).toString(),
    },
    {
      itemName: "Cheese",
      price: "3.50",
      purchaseDate: new Date().toString(),
      expiryDate: new Date(
        new Date().getTime() + 3 * 24 * 60 * 60 * 1000
      ).toString(),
    },
    {
      itemName: "Butter",
      price: "2.30",
      purchaseDate: new Date().toString(),
      expiryDate: new Date(
        new Date().getTime() + 2 * 24 * 60 * 60 * 1000
      ).toString(),
    },
  ];

  return (
    <ScrollView>
      {image && (
        <View>
          <Image
            source={{ uri: image }}
            style={{
              width: 400,
              height: 400,
              marginTop: -10,
              marginBottom: 10,
              resizeMode: "contain",
            }}
          />
          {showButton && (
            <TouchableOpacity
              onPress={analyseImage}
              className="flex-row justify-center"
            >
              <View className="bg-green-700 p-3 rounded-full">
                <Text className="text-white text-base">Analyse Receipt</Text>
              </View>
            </TouchableOpacity>
          )}
          {isLoading === true && (
            <View className="mt-2 justify-center items-center gap-1">
              <ActivityIndicator size={"large"} color="red" />
              <Text className="text-lg font-medium">Analysing receipt...</Text>
            </View>
          )}
          {isLoading === false && (
            <View>
              <Text className="text-lg leading-5 mx-4 mb-4 text-center">
                We found the following food items from your receipt. Please note
                the expiry day is only an estimate. Add or remove items and
                adjust expiry day as you wish.
              </Text>
              <View className="flex-row justify-between mx-8 mt-2">
                <Text className="text-lg font-medium">Item Name</Text>
                <Text className="text-lg font-medium">Estimated Expiry</Text>
              </View>
              {itemsByAi.map((eachItem, index) => {
                return <ScannedItemCard key={index} eachItem={eachItem} />;
              })}
            </View>
          )}
        </View>
      )}
      {!image && (
        <Text style={{ textAlign: "center", margin: 20 }} className="text-lg">
          This is where you will see your scanned items.
        </Text>
      )}
    </ScrollView>
  );
}
