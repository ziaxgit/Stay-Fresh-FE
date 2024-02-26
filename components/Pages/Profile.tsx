import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";
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

  const data = [
    { value: 20, color: "red" },
    { value: 50, color: "green" },
  ];

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const barData = [
    {value: 250, label: 'M'},
    {value: 500, label: 'T', frontColor: '#177AD5'},
    {value: 745, label: 'W', frontColor: '#177AD5'},
    {value: 320, label: 'T'},
    {value: 600, label: 'F', frontColor: '#177AD5'},
    {value: 256, label: 'S'},
    {value: 300, label: 'S'},
];

  return (
    <View className="flex-1 items-center  ">
      <View className="bg-white rounded-lg pt-3 shadow-lg py--1 px-20 flex-col items-center">
        <Text className="text-3xl mb-4 font-bold text-800">PROFILE</Text>
        <View className="flex-row">
          <Image
            className="rounded-full w-24 h-24 mb-4 mx-5"
            source={{
              uri: "https://ca.slack-edge.com/T01KPE0QGCD-U066BE21ALW-g582122507ca-512",
            }}
          />
          <View className="flex-col">
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
              <Text className="flex items-center text-lg font-semibold text-gray-700">
                Home:
              </Text>
              <Text className="text-center mt-1 text-lg"> {homeName}</Text>
            </Text>
          </View>
        </View>
      </View>
      <View className="pr-48">
        <PieChart
          donut
          data={data}
          textSize={20}
          innerRadius={55}
          radius={80}
          centerLabelComponent={() => {
            return (
              <Text>
                {" "}
                <Text style={{ fontSize: 15 }}>Total spent: £50 </Text>
              </Text>
            );
          }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 120,
            marginRight: 180,
            marginTop: 10,
          }}
        >
          {renderDot("green")}
          <Text style={{ color: "black" }}>Money Saved: £10</Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: 150 }}
        >
          {renderDot("red")}
          <Text style={{ color: "black" }}>Money Lost: £12.50</Text>
        </View>
      </View>
      <ScrollView>
            <BarChart
                barWidth={22}
                noOfSections={3}
                barBorderRadius={4}
                frontColor="black"
                data={barData}
                yAxisThickness={0}
                xAxisThickness={0}
            />
        </ScrollView>
    </View>
  );
};

export default Profile;
