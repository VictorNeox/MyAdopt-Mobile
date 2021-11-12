import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";
import { Alert } from "react-native";

const AuthContext = createContext({});

export const AuthProvider = (({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {      
      const [token, user] = await AsyncStorage.multiGet([
        "@MyAdopt:token",
        "@MyAdopt:user",
      ]);
  
      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
  
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async (data) => {
    const { data: resData } = await api.post('/auth/login', data);

    console.log(resData);
    const token = resData.token;
    delete resData.token;
    await AsyncStorage.multiSet([
      ["@MyAdopt:token", token],
      ["@MyAdopt:user", JSON.stringify(resData)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      user: resData,
      token,
    });
  });

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(["@MyAdopt:token", "@MyAdopt:user"]);

    setData({});
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
});

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}