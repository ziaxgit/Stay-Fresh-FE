import { StyleSheet, Button, Text, View } from "react-native";
import React, { useEffect } from "react";
import PantryList from "./PantryList";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = { Home: undefined; AddItem: undefined };
const ListContainer = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const unsubscribe = navigation.addListener("focus", () => {
  //       navigation.navigate("Home");
  //     });
  //     return unsubscribe;
  //   }, [navigation])
  //);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Button
        title="Add Item"
        onPress={() => {
          navigation.navigate("AddItem");
        }}
      />
      <Text style={{ fontSize: 20, textAlign: "center", paddingBottom: 10 }}>
        Your current items
      </Text>
      <View style={styles.ItemListHeading}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Name
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Expires in
        </Text>
      </View>
      <PantryList />
    </View>
  );
};

export default ListContainer;

const styles = StyleSheet.create({
  ItemListHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "orange",
  },
});
