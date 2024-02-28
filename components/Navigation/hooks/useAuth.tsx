import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";

const useAuth = () => {
  const [appUser, setAppUser] = useState<object | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAppUser(user);
      } else {
        setAppUser(null);
      }
    });
    return unsub;
  }, []);

  return { appUser };
};

export default useAuth;
