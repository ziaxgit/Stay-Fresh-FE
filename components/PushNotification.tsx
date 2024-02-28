import { Text } from "react-native-svg";
import { postNotification } from "./Utils/apiCalls";
import { useEffect, useState } from "react";
type ItemProp = { item_name: string; expiryDate: number; purchaseDate: number };
type ListProps = {
  currentList: {
    item_name: string;
    expiry_date: number;
    purchase_date: number;
  }[];
};
const PushNotification = (props: ListProps) => {
  const [notify, setNotify] = useState(false);
  props.currentList.map((item) => {
    const formattedPurchaseDate = Date.parse(item.purchase_date.toString());
    const currentDate = Date.now();
    const formattedExpiryDate = Date.parse(item.expiry_date.toString());
    let totalShelfLife =
      Number(formattedExpiryDate) - Number(formattedPurchaseDate);
    totalShelfLife = Math.floor(totalShelfLife / 1000 / 60 / 60 / 24);
    let numDaysRemaining = Number(formattedExpiryDate) - currentDate;
    numDaysRemaining = Math.floor(numDaysRemaining / 1000 / 60 / 60 / 24) + 1;

    if (numDaysRemaining <= 2) {
      setNotify(true);
    }
  });
  useEffect(() => {
    postNotification().then((response) => {
      console.log(response);
    });
  }, [notify]);
  return <></>;
};

export default PushNotification;
