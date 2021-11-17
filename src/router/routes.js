import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import BottomTabNavigator from '../pages/BottomTabNavigator';
import PetDetail from '../pages/PetDetail';
import NewAdoption from '../pages/NewAdoption';
export default function Routes() {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="root" component={BottomTabNavigator} />
            <AppStack.Screen name="signin" component={SignIn} />
            <AppStack.Screen name="signup" component={SignUp} />
            <AppStack.Screen name="newAdoption" component={NewAdoption} />
            <AppStack.Screen name="petDetail" component={PetDetail} />
        </AppStack.Navigator>
    );
}