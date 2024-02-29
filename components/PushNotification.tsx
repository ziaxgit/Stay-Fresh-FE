import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

type ListProps = {
  currentList: {
    item_name: string;
    expiry_date: number;
    purchase_date: number;
  }[];
};
const PushNotification = (props: ListProps) => {
  const [notify, setNotify] = useState(false);
  const [time, setTime] = useState([]);
  props.currentList.map((item) => {
    const formattedPurchaseDate = Date.parse(item.purchase_date.toString());
    const currentDate = Date.now();
    const formattedExpiryDate = Date.parse(item.expiry_date.toString());
    let totalShelfLife =
      Number(formattedExpiryDate) - Number(formattedPurchaseDate);
    totalShelfLife = Math.floor(totalShelfLife / 1000 / 60 / 60 / 24);
    let numDaysRemaining = Number(formattedExpiryDate) - currentDate;
    numDaysRemaining = Math.floor(numDaysRemaining / 1000 / 60 / 60 / 24) + 1;

    if (numDaysRemaining <= 2 && notify === false) {
      setNotify(true);
    }
  });
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Stay Fresh",
        body: "Please check your list you have items expiring soon",
      },
      trigger: {
        hour: 9,
        minute: 0,
        repeats: true,
      },
    }).then((result) => {});
  }, [notify]);

  return null;
};

export default PushNotification;
