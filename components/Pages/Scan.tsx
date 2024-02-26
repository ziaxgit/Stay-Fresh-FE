import React, { useState } from "react";
import { Button, Image, View, Text, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import OpenAI from "openai";
import config from "../../secret";

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Scan() {
  const [image, setImage] = useState<string | null>(null);
  const [alertShown, setAlertShown] = useState(false);
  const [texts, setTexts] = useState("");

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
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const apiKey = "AIzaSyDpJpxJVUAkkWpu0f9W0cVzKxHn1qL3MZg";
    const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

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
      // callOpenAI(apiResponse.data.responses[0].textAnnotations[0].description);
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
            'You are an expert receipt scanner. Given a list of text information, your job is to return an array with ONLY FOOD items from the text.\n\nEach food item should should be an object with property "itemName", "price: 0", "purchaseDate": todays date in javascript new Date().toString() and an average "expiryDate" based on your calculation of the items shelf life in javascript new Date().toString(). \n\nYou must research the internet and figure out which of the items could potentially be a food item if you are not sure. Your response should look like, \n\n[\n    {\n      itemName: "Apple",\n      price: "0",\n      purchaseDate: new Date().toString(),\n      expiryDate: new Date().toString(), // based on your knowledge of the item\n    },\n    {\n      itemName: "Milk",\n      price: "0",\n      purchaseDate: new Date().toString(),\n      expiryDate: new Date().toString(), // based on your knowledge of the item\n    },\n  ]\n',
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
    console.log(response.choices[0].message.content);
    console.log(response);
  };

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

  console.log(items);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {image && (
        <ScrollView style={{ marginTop: 10 }}>
          <Image
            source={{ uri: image }}
            style={{
              width: 400,
              height: 400,
              marginTop: 20,
              resizeMode: "contain",
            }}
          />
          <Button title="Analyse Image" onPress={analyseImage} />

          <View className="bg-red-200">
            <Text className="text-lg text-center">{texts}</Text>
          </View>
        </ScrollView>
      )}
      {!image && (
        <Text style={{ textAlign: "center", margin: 20 }} className="text-lg">
          This is where you will see your scanned items.
        </Text>
      )}
    </View>
  );
}
