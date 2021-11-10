import React from 'react';
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Routes from './src/router/routes';

import { AuthProvider } from './src/hooks/auth';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#7305e1"}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#7305e1"
        translucent
      />
      <AuthProvider>
        <NavigationContainer>
              <Routes />
        </NavigationContainer>
      </AuthProvider>
    </View>
  );
}