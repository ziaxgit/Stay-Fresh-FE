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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const LogIn = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignIn = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Please enter an email and password");
    }
  };

  return (
    <View className="bg-white">
      <View className="w-full mt-8 px-10">
        <Text className="text-2xl leading-7 text-center ">
          Scan your receipts, track groceries, save money and get recipe ideas
          all in one place.
        </Text>
      </View>

      <View
        className="h-full px-14 pt-8 mt-8 mb-4 bg-green-500 "
        style={{ borderTopRightRadius: 40, borderTopLeftRadius: 40 }}
      >
        <View>
          <Text className="ml-2 text-base mb-1 mt- ">Email address</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter email"
            className="bg-gray-200 rounded-lg p-2 mb-1"
            mt-3
          />
          <Text className="ml-2 text-base mb-1 mt-2 ">Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholder="Enter password"
            className="bg-gray-200 rounded-lg p-2 mb-1"
          />
        </View>

        <TouchableOpacity
          className="bg-gray-700 rounded-full p-2 mt-3"
          onPress={handleSignIn}
        >
          <Text className="text-center text-white text-lg">Sign In</Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-200 font-bold mt-2">OR</Text>

        <TouchableOpacity className="bg-gray-200 rounded-full p-2 mt-2">
          <View className="flex-row justify-center items-center">
            <Text className="text-center text-lg text-black">
              Sign in using
            </Text>
            <Image
              source={require("../../assets/google-logo.png")}
              style={{
                width: 70,
                height: 20,
                resizeMode: "contain",
                marginTop: 5,
              }}
            />
          </View>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mt-4 mb-20">
          <Text className="font-light">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-blue-700 font-bold"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LogIn;
