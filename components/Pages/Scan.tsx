import React, { useState } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Scan() {
  const [image, setImage] = useState(null);

  const takePicture = async () => {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // Disable cropping
      quality: 1,
    });

    console.log(result, "<<<< RESULT"); // Log the result to see its structure
    console.log("====================================");
    console.log("test log");
    setImage(result.assets[0].uri);
    console.log("====================================");
    console.log(image);
    console.log("====================================");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
