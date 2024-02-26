import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { getUserNameByHomeId, getHomeName } from "../Utils/apiCalls";
const Profile = () => {
  const [userName, setUserName] = useState("");
  const [homeName, setHomeName] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getUserNameByHomeId()
      .then((data) => {
        const { users } = data;
        setUserName(users[0].user_name);
      })
      .catch(() => {
        setIsError(true);
      });

    getHomeName()
      .then(({ homes }) => {
        setHomeName(homes[0].home_name);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  return (
    <View className="flex-1 items-center  ">
      <View className="bg-white rounded-lg mt-6 shadow-lg py-6 px-20 flex flex-col items-center">
        <Text className="text-3xl mb-4 font-bold text-800">PROFILE</Text>
        <Image
          className="rounded-full w-36 h-36 mb-4"
          source={{
            uri: "https://ca.slack-edge.com/T01KPE0QGCD-U066BE21ALW-g582122507ca-512",
          }}
        />
        <Text>
          <Text className="flex items-center text-lg font-semibold text-gray-700">
            Username:
          </Text>
          <Text className="text-lg text-900"> {userName}</Text>
        </Text>
        <Text>
          <Text className="flex items-center text-lg font-semibold text-gray-700">
            Email:
          </Text>
          <Text className="text-lg text-900"> smith01@hotmail.com</Text>
        </Text>
        <Text>
          {" "}
          <Text className="flex items-center text-lg font-semibold text-gray-700">
            Home:
          </Text>
          <Text className="text-center mt-1 text-lg"> {homeName}</Text>
        </Text>
      </View>
    </View>
  );
};

export default Profile;
