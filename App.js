import React from 'react';
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Routes from './src/router/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#7305e1"
        translucent
      />
        <View style={{ flex: 1, backgroundColor: "#7305e1" }}>
          <Routes />
        </View>
    </NavigationContainer>
  );
}