import React, { useState } from "react";
import { Button, Image, View, Text, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import * as FileSystem from "expo-file-system";

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
        setTexts("");
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
      setTexts("");
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
            features: [{ type: "TEXT_DETECTION" }],
          },
        ],
      };

      const apiResponse = await axios.post(apiURL, requestData);
      console.log(apiResponse.data.responses[0].textAnnotations[0].description);
      const detectedTexts = apiResponse.data.responses[0].textAnnotations?.map(
        (result: any) => result.description
      ) || ["No text detected"];
      setTexts(apiResponse.data.responses[0].textAnnotations[0].description);
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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {image && (
        <>
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
              <Text className="text-lg">{texts}</Text>
            </View>
          </ScrollView>
        </>
      )}
      {!image && (
        <Text style={{ textAlign: "center", margin: 20 }} className="text-lg">
          This is where you will see your scanned items.
        </Text>
      )}
    </View>
  );
}
