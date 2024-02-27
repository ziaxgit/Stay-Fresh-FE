import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  View,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import OpenAI from "openai";
import ScannedItemCard from "./ScannedItemCard";
import { postItemByHomeId } from "../Utils/apiCalls";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./Home";

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
  const [deleteIndexes, setDeleteIndexes] = useState<number[]>([]);
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [addAnotherItem, setAddAnotherItem] = useState(false);
  const [componentInstances, setComponentInstances] = useState([]);

  const handleAddAnotherItem = () => {
    setItemsByAi([...itemsByAi, { daysToExpiry: "", itemName: "", price: 0 }]);
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
      const parsedData = itemsByAiString && JSON.parse(itemsByAiString);
      setItemsByAi([...parsedData]);
      // setItemsByAi([
      //   ...[
      //     { daysToExpiry: 21, itemName: "Natural Yogurt", price: 0.7 },
      //     { daysToExpiry: 7, itemName: "Cherry Tomatoes", price: 1.29 },
      //     { daysToExpiry: 7, itemName: "Cherry Tomatoes", price: 1.29 },
      //     { daysToExpiry: 7, itemName: "Cherry Tomatoes", price: 1.29 },
      //     { daysToExpiry: 7, itemName: "Cherry Tomatoes", price: 1.29 },
      //     { daysToExpiry: 7, itemName: "Cherry Tomatoes", price: 1.29 },
      //     { daysToExpiry: 7, itemName: "Plum Tomatoes", price: 1.29 },
      //   ],
      // ]);
      // use this data for testing purposes
    } catch (error) {
      console.error("There was an issue: ", error);
      alert(error);
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
                navigation.goBack();
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

  const handleSave = async () => {
    const finalItemsToPost = itemsByAi.filter(
      (_, index) => !deleteIndexes.includes(index)
    );

    try {
      finalItemsToPost.forEach((item: any) => {
        if (item.item_name === "") {
          throw new Error(
            "Missing fields found. Please fill out all the fields."
          );
        }
      });

      if (finalItemsToPost.length === 0) {
        setIsListEmpty(true);
      } else {
        await Promise.all(
          finalItemsToPost.map(async (itemToPost) => {
            await postItemByHomeId(itemToPost);
          })
        );
        Alert.alert(
          "Saved successfully!",
          "These items have been added to your Homepage",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack();
              },
            },
          ]
        );
      }
    } catch (error) {
      alert(error);
    }
  };

  if (isListEmpty) {
    Alert.alert("Empty List", "There are no items to add", [
      {
        text: "Back to Homepage",
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  }
  const scrollViewRef = useRef();

  return (
    <KeyboardAvoidingView
      className="flex-1 h-full"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={115}
    >
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {image && (
          <View>
            <Image
              source={image ? { uri: image } : undefined}
              style={{
                flex: 1,
                height: 400,
                marginBottom: 10,
                marginTop: -3,
                resizeMode: "contain",
              }}
            />
            {image && showButton && (
              <TouchableOpacity
                onPress={analyseImage}
                className="flex-row justify-center"
              >
                <View className="bg-green-700 p-3 rounded-full">
                  <Text className="text-white text-base">Analyse Receipt</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
        {isLoading === true && (
          <View className="mt-4 justify-center items-center gap-1">
            <ActivityIndicator size={"large"} color="red" />
            <Text className="text-lg font-medium">Analysing receipt...</Text>
          </View>
        )}
        {isLoading === false && (
          <View className="">
            <View className="bg-amber-200 rounded-t-3xl p-2 ">
              <Text className="text-base mx-5 leading-5 text-center">
                We found the following food items from your receipt. Please note
                the expiry day is only an estimate. Add or remove items and
                adjust expiry day as appropriate.
              </Text>
            </View>
            <View className="flex-row justify-between mx-4 mt-2">
              <Text className="text-base font-medium ml-9">Item Name</Text>
              <Text className="text-base font-medium ml-9">Price</Text>
              <Text className="text-base font-medium mr-4">Expiry Date</Text>
            </View>
            {itemsByAi.map((eachItem, index) => {
              return (
                <ScannedItemCard
                  key={index}
                  index={index}
                  eachItem={eachItem}
                  setDeleteIndexes={setDeleteIndexes}
                  setItemsByAi={setItemsByAi}
                />
              );
            })}

            {componentInstances.map((instance, index) => (
              <View key={index}>{instance}</View>
            ))}

            {!isListEmpty && (
              <TouchableOpacity
                className="mt-2 mb-2 flex-row justify-center bg-gray-700 p-1 rounded-full mx-2"
                onPress={handleAddAnotherItem}
              >
                <Text className="text-white text-lg font-medium">
                  Add another item
                </Text>
              </TouchableOpacity>
            )}

            {!isListEmpty && (
              <TouchableOpacity
                className="mb-2 flex-row justify-center bg-green-700 p-1 rounded-full mx-2"
                onPress={handleSave}
              >
                <Text className="text-white text-lg font-medium">Save</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {!image && (
          <Text
            style={{ textAlign: "center", margin: 25 }}
            className="text-xl mx-8 font-medium text-gray-700"
          >
            Seamlessly scan your receipts using latest Google Cloud Vision and
            OpenAI GPT-4 technology
          </Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
