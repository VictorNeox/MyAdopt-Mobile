import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import { isSignedIn } from '../services/auth';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import BottomTabNavigator from '../pages/BottomTabNavigator';

export default function Routes() {
    return(
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="signin" component={SignIn}/>
            <AppStack.Screen name="root" component={BottomTabNavigator} />
            <AppStack.Screen name="signup" component={SignUp}/>
        </AppStack.Navigator>
    );
  }
  // {isSignedIn ? (
  //         <AppStack.Navigator screenOptions={{ headerShown: false }}>
  //         {/* <AppStack.Screen name="home" component={Home}/> */}
  //         </AppStack.Navigator>
  //     ) : (   
  //         <AppStack.Navigator screenOptions={{ headerShown: false }}>
  //         <AppStack.Screen name="signin" component={SignIn}/>
  //         {/* <AppStack.Screen name="register" component={Register}/> */}
  //         </AppStack.Navigator>
  //     )
  // }