import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View>
      <Text style={styles.header}>Stay Fresh</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    padding: 16,
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
