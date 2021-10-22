import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import { isSignedIn } from '../services/auth';

import SignIn from '../pages/SignIn';
// import Register from './pages/Register';
// import Home from './pages/Home';

export default function Routes() {
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="signin" component={SignIn}/>
                    <AppStack.Screen name="register" component={SignIn}/>
            </AppStack.Navigator>
        </NavigationContainer>
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