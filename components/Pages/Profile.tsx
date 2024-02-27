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
    { value: 20, color: "#D3D3D3" },
    { value: 50, color: "#3BB566" },
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
    { value: 30, label: "M", frontColor: "#3BB566" },
    { value: 23, label: "T", frontColor: "#3BB566" },
    { value: 5, label: "W", frontColor: "#3BB566" },
    { value: 7, label: "T", frontColor: "#3BB566" },
    { value: 15, label: "F", frontColor: "#3BB566" },
    { value: 5, label: "S", frontColor: "#3BB566" },
    { value: 5, label: "S", frontColor: "#3BB566" },
  ];

  return (
    <View className="flex-1 items-center bg-gray-100">
      <View className="bg-white rounded-lg pt-3 shadow-lg py--1 px-20 flex-col items-center mb-5">
        <Text className="text-3xl mb-4 font-bold text-500">PROFILE</Text>
        <View className="flex-row">
          <Image
            className="rounded-full w-24 h-24 mb-4 mx-5"
            source={{
              uri: "https://kottke.org/plus/misc/images/ai-faces-01.jpg",
            }}
          />
          <View className="flex-col">
            <Text className="mt-2">
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
      <ScrollView>
        <View className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-md">
          <Text className="text-2xl mb-4 font-bold text-center">
            STATISTICS
          </Text>
          <View className="flex-row justify-between mb-6">
            <PieChart
              className="rounded-lg w-1/2"
              donut
              data={data}
              textSize={20}
              innerRadius={50}
              radius={60}
              centerLabelComponent={() => (
                <Text className="text-center">
                  <Text className="font-semibold text-gray-700">
                    Total spent:{" "}
                  </Text>
                  <Text className="font-semibold text-gray-900 ">£50</Text>
                </Text>
              )}
            />
            <View className="flex-col justify-center">
              <View className="flex items-center mb-2 flex-row">
                {renderDot("#3BB566")}
                <Text className="text-lg text-gray-900 ml-2">
                  Saved: £37.50
                </Text>
              </View>
              <View className="flex items-center flex-row">
                {renderDot("#D3D3D3")}
                <Text className="text-lg text-gray-900 ml-2">Lost: £12.50</Text>
              </View>
            </View>
          </View>
          <BarChart
            className="rounded-lg w-full"
            barWidth={22}
            noOfSections={3}
            barBorderRadius={4}
            frontColor="black"
            data={barData}
            yAxisThickness={0}
            xAxisThickness={1}
            isAnimated
            delay={500}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
