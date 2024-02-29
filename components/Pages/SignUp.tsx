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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignUp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const handleSignUp = async () => {
    if (email && password && firstName && lastName) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Please fill in all the fields");
    }
  };

  return (
    <View className="bg-white h-full ">
      <Text className="text-3xl mb-5 text-center font-semibold mt-10">
        Register
      </Text>
      <View
        className="px-10 pt-4 bg-green-500 mx-6 pb-8"
        style={{ borderRadius: 40 }}
      >
        <View>
          <View className="flex-row justify-between w-full mt-2">
            <View style={{ width: "48%" }}>
              <Text className="ml-2 text-base mb-1 mt- ">First Name</Text>
              <TextInput
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                placeholder="First name"
                className="bg-gray-200 rounded-lg p-2 mb-1"
                mt-3
              />
            </View>
            <View style={{ width: "48%" }}>
              <Text className="ml-2 text-base mb-1 mt- ">Last Name</Text>
              <TextInput
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                placeholder="Last name"
                className="bg-gray-200 rounded-lg p-2 mb-1"
                mt-3
              />
            </View>
          </View>

          <Text className="ml-2 text-base mb-1 mt-2 ">Email address</Text>
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
          onPress={handleSignUp}
        >
          <Text className="text-center text-lg text-white">Sign Up</Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-center mt-4">
          <Text className="font-light">Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-blue-700 font-bold"> Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
