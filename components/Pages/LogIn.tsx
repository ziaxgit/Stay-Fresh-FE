import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./Home";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const LogIn = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView className="bg-white">
      <Text className="font-medium shadow-gray-700 italic text-sm text-center -mt-1 ">
        Your Penny Saving Grocery Companion
      </Text>
      <View className="w-full mt-8 px-10">
        <Text className="text-2xl leading-7 text-center ">
          Scan your receipts, track groceries, save money and get recipe ideas
          all in one place.
        </Text>
      </View>

      <View
        className="h-full px-14 pt-8 mt-8 mb-4 bg-green-500"
        style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}
      >
        <View>
          <Text className="ml-2 text-base mb-1 mt- ">Email address</Text>
          <TextInput
            placeholder="Enter email"
            className="bg-gray-200 rounded-lg p-2 mb-1"
            mt-3
          />
          <Text className="ml-2 text-base mb-1 mt-2 ">Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Enter password"
            className="bg-gray-200 rounded-lg p-2 mb-1"
          />
        </View>
        {/* <TouchableOpacity>
          <Text className="text-right mr-2 mt-1 text-gray-700">
            Forgot password?
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity className="bg-gray-700 rounded-lg p-2 mt-3">
          <Text className="text-center text-white">Sign In</Text>
        </TouchableOpacity>
        <Text className="text-center text-gray-200 font-bold mt-2">OR</Text>
        <TouchableOpacity className="bg-gray-200 rounded-lg p-2 mt-2">
          <View className="flex-row justify-center">
            <Text className="text-center text-black">Sign in using</Text>
            <Image
              source={require("../../assets/google-logo.png")}
              style={{ width: 70, height: 20, resizeMode: "contain" }}
            />
          </View>
        </TouchableOpacity>
        <View className="flex-row justify-center mt-4">
          <Text className="">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-blue-700 font-bold"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LogIn;
