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
    <View className="flex-1 items-center mt-6">
      <Text className="text-3xl mb-5">PROFILE</Text>
      <Image
        className="rounded-full w-36 h-36"
        source={{
          uri: "https://ca.slack-edge.com/T01KPE0QGCD-U066BE21ALW-g582122507ca-512",
        }}
      />
      <Text className="text-center mt-5 text-lg">Username: {userName}</Text>
      <Text className="text-center mt-1 text-lg">
        Email: smith01@hotmail.com
      </Text>
      <Text className="text-center mt-1 text-lg">Home: {homeName}</Text>
    </View>
  );
};

export default Profile;
