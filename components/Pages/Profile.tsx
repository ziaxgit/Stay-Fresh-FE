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

  const barData: { value: number; label: string; frontColor: string }[] = [
    { value: 30, label: "Mon", frontColor: "#3BB566" },
    { value: 23, label: "Tue", frontColor: "#3BB566" },
    { value: 5, label: "Wed", frontColor: "#3BB566" },
    { value: 7, label: "Thu", frontColor: "#3BB566" },
    { value: 15, label: "Fri", frontColor: "#3BB566" },
    { value: 5, label: "Sat", frontColor: "#3BB566" },
    { value: 5, label: "Sun", frontColor: "#3BB566" },
  ];

  const items: {
    item_name: string;
    item_price: number;
    purchase_date: string;
    expiry_date: string;
    home_id: number;
    item_status?: string;
  }[] = [
    {
      item_name: "Milk",
      item_price: 155,
      purchase_date: "Tue Feb 20 2024 19:33:50 GMT+0100",
      expiry_date: "Tue Feb 27 2024 19:33:50 GMT+0100",
      home_id: 1,
      item_status: "ACTIVE",
    },

    {
      item_name: "Cornflakes",
      item_price: 400,
      purchase_date: "Tue Feb 20 2024 19:33:50 GMT+0100",
      expiry_date: "Sat Mar 30 2024 19:33:50 GMT+0100",
      home_id: 1,
      item_status: "USED",
    },
    {
      item_name: "Bread",
      item_price: 195,
      purchase_date: "Tue Feb 20 2024 19:33:50 GMT+0100",
      expiry_date: "Thur Feb 29 2024 19:33:50 GMT+0100",
      home_id: 1,
      item_status: "TRASHED",
    },
    {
      item_name: "Eggs",
      item_price: 95,
      purchase_date: "Tue Feb 20 2024 19:33:50 GMT+0100",
      expiry_date: "Tue Mar 5 2024 19:33:50 GMT+0100",
      home_id: 1,
      item_status: "USED",
    },
    {
      item_name: "Carrots",
      item_price: 45,
      purchase_date: "Sun Feb 18 2024 19:33:50 GMT+0100",
      expiry_date: "Tue Mar 19 2024 19:33:50 GMT+0100",
      home_id: 2,
      item_status: "TRASHED",
    },
    {
      item_name: "Potatoes",
      item_price: 110,
      purchase_date: "Sun Feb 18 2024 19:33:50 GMT+0100",
      expiry_date: "Tue Mar 19 2024 19:33:50 GMT+0100",
      home_id: 2,
      item_status: "USED",
    },
    {
      item_name: "Bread",
      item_price: 110,
      purchase_date: "Fri Mar 15 2024 19:33:50 GMT+0100",
      expiry_date: "Tue Mar 19 2024 19:33:50 GMT+0100",
      home_id: 2,
      item_status: "USED",
    },
  ];

  const updateBarData = () => {
    const dayOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    items.forEach((item) => {
      const purchaseDayIndex = new Date(item.purchase_date).getDay();
      // console.log(purchaseDayIndex, "<== purchase day index");

      const purchaseDay = dayOfTheWeek[purchaseDayIndex];
      // console.log(purchaseDay, "<=== purchaseDay");

      const foundDay = barData.find((dayItem) => dayItem.label === purchaseDay);
      console.log(foundDay, "<==== found day");
      foundDay.value = item.item_price;
      console.log(foundDay["value"]);
    });
  };

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
        <Text> {updateBarData()}</Text>
      </ScrollView>
    </View>
  );
};

export default Profile;
