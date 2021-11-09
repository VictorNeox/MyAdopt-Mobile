import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import PetDetail from '../PetDetail';

const Stack = createStackNavigator();
// import { Container } from './styles';

const StackNavigator = ({ navigation, route }) => {

  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signin" component={SignIn} />
        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="petDetail" component={PetDetail} />
    </Stack.Navigator>
  );
}

export default StackNavigator;