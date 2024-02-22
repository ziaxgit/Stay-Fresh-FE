import React, { useState } from "react";
import { Image, View, Text, Alert } from "react-native";
import * as Camera from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";

export default function Scan() {
  const [image, setImage] = useState<string | null>(null);
  const [alertShown, setAlertShown] = useState<boolean>(false);
  const takePicture = async () => {
    try {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      if (cameraStatus.status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
      const result = await Camera.launchCameraAsync({
        mediaTypes: Camera.MediaTypeOptions.Images,
        allowsEditing: false, // Disable cropping
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
    const result = await Camera.launchImageLibraryAsync({
      mediaTypes: Camera.MediaTypeOptions.Images,
      allowsEditing: false, // Disable cropping
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useFocusEffect(() => {
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
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={{
            width: 400,
            height: 400,
            marginTop: 20,
            objectFit: "contain",
          }}
        />
      ) : (
        <Text className="text-xl text-center mx-10">
          This is where you will see your scanned items.
        </Text>
      )}
    </View>
  );
}
