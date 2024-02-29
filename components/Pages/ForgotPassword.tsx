import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./Home";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

const ForgotPassword = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = React.useState("");

  const handleClick = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert(
          "Link sent!",
          "Please follow the instrcutions to reset your password",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack();
              },
            },
          ]
        );
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Please enter an email");
    }
  };

  return (
    <View className="bg-white h-full">
      <Text className="text-3xl mb-2 mt-14 text-center font-semibold">
        Forgot Password?
      </Text>
      <View
        className="px-10 pt-8 mt-2 mb-4 bg-green-500 mx-6"
        style={{ borderRadius: 40 }}
      >
        <View>
          <Text className="ml-2 text-sm mb-5 text-center mx-1">
            Enter your email address and we will send you a link to reset your
            password
          </Text>

          <Text className="ml-2 text-base mb-1 mt- ">Email address</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter email"
            className="bg-gray-200 rounded-lg p-2 mb-1"
            mt-3
          />

          <TouchableOpacity
            className="bg-gray-700 rounded-full p-2 mt-3"
            onPress={handleClick}
          >
            <Text className="text-center text-white text-lg">Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-sm mt-5 font-medium mr-2 text-center text-gray-700 mb-5">
              Back to Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default ForgotPassword;
