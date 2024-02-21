import React, { useState } from "react";
import { Button, Image, View, Text, Alert } from "react-native";
import * as Camera from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";

export default function Scan() {
  const [image, setImage] = useState<string | null>(null);

  const takePicture = async () => {
    try {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      if (cameraStatus.status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }

      let result = await Camera.launchCameraAsync({
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
    let result = await Camera.launchImageLibraryAsync({
      mediaTypes: Camera.MediaTypeOptions.Images,
      allowsEditing: false, // Disable cropping
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useFocusEffect(() => {
    Alert.alert(
      "What would you like to do?",
      null,
      [
        {
          text: "Scan Receipt",
          onPress: () => takePicture(),
        },
        {
          text: "Choose from Gallery",
          onPress: () => pickImage(),
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
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Button title="Take Picture" onPress={takePicture} /> */}
      {/* <Button title="Pick Image from Gallery" onPress={pickImage} /> */}
      <View>
        {/* <Text onPress={showCustomAlert}>Show Custom Alert</Text> */}
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 400,
            height: 400,
            marginTop: 20,
            objectFit: "contain",
          }}
        />
      )}
    </View>
  );
}
