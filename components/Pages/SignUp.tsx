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

const SignUp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView className="bg-white ">
      <Text className="font-medium shadow-gray-700 italic text-sm text-center -mt-1 ">
        Your Penny Saving Grocery Companion
      </Text>

      <View
        className="p-48 px-14 pt-8 mt-8 mb-4 bg-green-500"
        style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}
      >
        <View>
          <View className="flex-row justify-between w-full ">
            <View className="w-32">
              <Text className="ml-2 text-base mb-1 mt- ">First Name</Text>
              <TextInput
                placeholder="First name"
                className="bg-gray-200 rounded-lg p-2 mb-1"
                mt-3
              />
            </View>
            <View className="w-32">
              <Text className="ml-2 text-base mb-1 mt- ">Last Name</Text>
              <TextInput
                placeholder="Last name"
                className="bg-gray-200 rounded-lg p-2 mb-1"
                mt-3
              />
            </View>
          </View>

          <Text className="ml-2 text-base mb-1 mt-2 ">Email address</Text>
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
          <Text className="text-center text-white">Sign Up</Text>
        </TouchableOpacity>
        <Text className="text-center text-gray-200 font-bold mt-2">OR</Text>
        <TouchableOpacity className="bg-gray-200 rounded-lg p-2 mt-2">
          <View className="flex-row justify-center">
            <Text className="text-center text-black">Sign up using</Text>
            <Image
              source={require("../../assets/google-logo.png")}
              style={{ width: 70, height: 20, resizeMode: "contain" }}
            />
          </View>
        </TouchableOpacity>
        <View className="flex-row  justify-center mt-4 mb-8">
          <Text className="">Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-blue-700 font-bold"> Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
