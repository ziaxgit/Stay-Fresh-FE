import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { getUserNameByHomeId } from "../Utils/apiCalls";
const Profile = () => {
  const [userName, setUserName] = useState("");
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    getUserNameByHomeId()
      .then((data) => {
        const { users } = data;
        console.log(users);
        setUserName(users[0].user_name);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);
  return (
    <View>
      <Image
        className="rounded-full w-24 h-24 place-self-center"
        source={{
          uri: "https://ca.slack-edge.com/T01KPE0QGCD-U066BE21ALW-g582122507ca-512",
        }}
      />
      <Text>Username: {userName}</Text>
    </View>
  );
};

export default Profile;
