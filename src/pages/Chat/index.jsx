import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../../hooks/auth';

// import { Container } from './styles';

const Chat = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  if (!user) {
    navigation.navigate('signin');
  }

  return <View />;
}

export default Chat;