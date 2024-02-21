import React, { useState } from "react";
import { Button, Image, View } from "react-native";
import * as Camera from "expo-image-picker";

export default function Scan() {
  const [image, setImage] = useState(null);

  const takePicture = async () => {
    try {
      let result = await Camera.launchCameraAsync({
        mediaTypes: Camera.MediaTypeOptions.Images,
        allowsEditing: false, // Disable cropping
        quality: 1,
      });
      setImage(result.assets[0].uri);
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
    setImage(result.assets[0].uri);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Take Picture" onPress={takePicture} />
      <Button title="Pick Image from Gallery" onPress={pickImage} />

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
