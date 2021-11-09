import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Home';
import PetMap from '../PetMap';
// import { StatusBar } from 'react-native';

const Tab = createMaterialBottomTabNavigator();

// import { Container } from './styles';

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      activeColor="#7305e1"
      inactiveColor="#9FA2AF"
      barStyle={{
        borderTopWidth: 0.4,
        borderTopColor: '#E2E2E2',
        backgroundColor: '#fff'
      }}
      screenOptions={{ headerShown: false }}
    >
      {/* <StatusBar
          barStyle="light-content"
          backgroundColor="#e2e2e2"
          translucent
        /> */}
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="paw" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="mapa"
        component={PetMap}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={Home}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="perfil"
        component={Home}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;