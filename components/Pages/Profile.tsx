import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";
import {
  getUserNameByHomeId,
  getHomeName,
  getAllItemsByHomeId,
} from "../Utils/apiCalls";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [homeName, setHomeName] = useState("");
  const [isError, setIsError] = useState(false);
  const [barData, setBarData] = useState([
    { value: 0, label: "Sun", frontColor: "#3BB566" },
    { value: 0, label: "Mon", frontColor: "#3BB566" },
    { value: 0, label: "Tue", frontColor: "#3BB566" },
    { value: 0, label: "Wed", frontColor: "#3BB566" },
    { value: 0, label: "Thu", frontColor: "#3BB566" },
    { value: 0, label: "Fri", frontColor: "#3BB566" },
    { value: 0, label: "Sat", frontColor: "#3BB566" },
  ]);
  const [pieData, setPieData] = useState([
    { value: 0, color: "#3BB566" },
    { value: 0, color: "#D3D3D3" },
  ]);
  let [totalSaved, setTotalSaved] = useState(0);
  let [totalLost, setTotalLost] = useState(0);
  interface ItemState {
    item_name: string;
    item_price: number;
    purchase_date: string;
    expiry_date: string;
    home_id: number;
    item_status?: string;
  }

  const [items, setItems] = useState<ItemState[]>([]);

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

    Promise.all([
      getAllItemsByHomeId("USED"),
      getAllItemsByHomeId("TRASHED"),
    ]).then((result) => {
      const [usedData, trashedData] = result;
      const usedItems = usedData.data.items;
      const trashedItems = trashedData.data.items;
      const mergedItems = [...usedItems, ...trashedItems];

      setItems(mergedItems);
    });
  }, []);

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
  const updateBarData = () => {
    const currentDate = new Date();
    const first = currentDate.getDate() - currentDate.getDay();
    const last = first + 6;
    const firstDayOfTheWeek = new Date(currentDate.setDate(first));
    const lastDayOfTheWeek = new Date(currentDate.setDate(last));

    const dayOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const updatedBarData = [...barData];
    updatedBarData.map((data) => {
      data.value = 0;
    });

    items.forEach((item) => {
      const purchaseDayIndex = new Date(item.purchase_date).getDay();

      const purchaseDay = dayOfTheWeek[purchaseDayIndex];

      const purchaseDate = new Date(item.purchase_date);

      if (
        purchaseDate >= firstDayOfTheWeek &&
        purchaseDate <= lastDayOfTheWeek &&
        item.item_status === "USED"
      ) {
        const foundDay = updatedBarData.find(
          (dayItem) => dayItem.label === purchaseDay
        );

        if (foundDay) {
          foundDay.value += item.item_price / 100;
        }
      }
    });

    return updatedBarData;
  };

  const updatePieData = () => {
    const currentDate = new Date();
    const firstDayOfTheMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfTheMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    let totalSaved: number = 0;
    let totalLost: number = 0;
    if (items !== undefined) {
      items.forEach((item) => {
        const purchaseDate = new Date(item.purchase_date);
        if (
          purchaseDate >= firstDayOfTheMonth &&
          purchaseDate <= lastDayOfTheMonth &&
          item.item_status === "USED"
        ) {
          totalSaved += Number(item.item_price) / 100;
        } else if (
          purchaseDate >= firstDayOfTheMonth &&
          purchaseDate <= lastDayOfTheMonth &&
          item.item_status === "TRASHED"
        ) {
          totalLost += Number(item.item_price) / 100;
        }
      });
    }

    setTotalSaved(totalSaved);
    setTotalLost(totalLost);
    pieData[0].value = totalSaved;
    pieData[1].value = totalLost;

    return pieData;
  };

  useEffect(() => {
    const newBarData = updateBarData();
    setBarData(newBarData);
    const Pie = updatePieData();

    setPieData(Pie);
  }, [items]);

  const handleSignOut = async () => {
    await signOut(auth);
    return <ActivityIndicator />;
  };

  return (
    <View className="flex-1 items-center bg-gray-100">
      <View className="bg-white rounded-lg pt-3 shadow-lg py--1 px-20 flex-col items-center mb-5">
        <Text className="text-xl mb-4 font-bold ">Profile</Text>
        <View className="flex-row">
          <Image
            className="rounded-full w-24 h-24 mb-4 mx-5"
            source={{
              uri: "https://kottke.org/plus/misc/images/ai-faces-01.jpg",
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
        <TouchableOpacity
          className="rounded-full bg-green-600 px-3 py-2 mb-4"
          onPress={handleSignOut}
        >
          <Text className="text-lg text-white font-medium ">Sign Out</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-md">
          <Text className="text-xl font-bold  text-center">Insights</Text>
          <View className="flex-row justify-between mb-6">
            {pieData[0].value > 0 ? (
              <PieChart
                donut
                data={pieData}
                textColor="black"
                textSize={20}
                innerRadius={50}
                radius={60}
                centerLabelComponent={() => (
                  <View className="items-center justify-center">
                    <Text className="font-semibold text-gray-700">Monthly</Text>
                    <Text className="font-semibold text-gray-700">spend</Text>
                    <Text className="font-semibold text-gray-900 ">
                      £{(totalSaved + totalLost).toFixed(2)}
                    </Text>
                  </View>
                )}
              />
            ) : (
              <View className="items-center gap-2">
                <ActivityIndicator size={"large"} color={"red"} />
                <Text className="text-lg">Loading chart...</Text>
              </View>
            )}

            <View className="flex-col justify-center">
              <View className="flex items-center mb-2 flex-row">
                {renderDot("#3BB566")}
                <Text className="text-lg text-gray-900 ml-2">
                  Saved: £{totalSaved.toFixed(2)}
                </Text>
              </View>
              <View className="flex items-center flex-row">
                {renderDot("#D3D3D3")}
                <Text className="text-lg text-gray-900 ml-2">
                  Lost: £{totalLost.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
          <Text className="text-lg mb-4 font-bold  text-center">
            Weekly Stats
          </Text>
          <BarChart
            barWidth={22}
            noOfSections={3}
            barBorderRadius={4}
            frontColor="black"
            data={barData}
            height={150}
            yAxisThickness={0}
            xAxisThickness={1}
            isAnimated
            delay={500}
            renderTooltip={(item: any, index: any) => {
              return (
                <View
                  style={{
                    marginBottom: 5,
                    marginLeft: -4,
                    backgroundColor: "#D3D3D3",
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text>£{item.value.toFixed(2)}</Text>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
