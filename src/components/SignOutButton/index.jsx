import React from 'react';
import { Alert, Text } from 'react-native';

import { Container } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

const SignOutButton = () => {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();

  const navigateToSignIn = () => {
    signOut();
    Alert.alert('Sucesso', 'Logout realizado com sucesso.');
    navigation.navigate('root', { screen: 'home' });
    console.log(user);
  }

  return (
    <Container onPress={navigateToSignIn}>
        <MaterialCommunityIcons name="exit-to-app" style={{ fontWeight: 'bold' }} size={22} color="gray" />
        <Text style={{ marginLeft: 8, color: "gray", fontWeight: 'bold' }}>Sair</Text>
    </Container>
  );
}

export default SignOutButton;