import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Home';
import PetMap from '../PetMap';
import Profile from '../Profile';
import Chat from '../Chat';
import { Alert, View } from 'react-native';
// import { StatusBar } from 'react-native';

const Tab = createMaterialBottomTabNavigator();

// import { Container } from './styles';

import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

const BottomTabNavigator = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
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
      shifting={false}
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
      {user && (
        <Tab.Screen
          name="chat"
          component={Chat}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="chat" color={color} size={22} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              Alert.alert('Erro', 'Funcionalidade em desenvolvimento.')
            }
          }}
        />
      )}
      {user ? (
        <Tab.Screen
          name="perfil"
          component={Profile}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={22} />
            ),
          }}
        />
      )
      :
      (
        <Tab.Screen
          name="login"
          component={Chat}
          options={{
            tabBarLabel: 'Entrar',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="login" color={color} size={22} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('signin');
            }
          }}
        />
      )}
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;