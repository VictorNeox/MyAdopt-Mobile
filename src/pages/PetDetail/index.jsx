import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Header,
  Logo,
  ContactContainer,
  Action,
  ActionText,
  ContactTitle
} from './styles';
import logo from '../../assets/logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';

import PetPost from '../../components/PetPost';

import { Linking, ScrollView, TouchableOpacity } from 'react-native';

import capitalize from '../../utils/capitalize';

import * as MailComposer from 'expo-mail-composer';

const PetDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const data = route.params.petData;
  const message = `Olá ${data.userName}, estou entrando em contato pois tenho interesse no animal de estimação ${capitalize(data.petName)} anunciado no aplicativo MyAdopt. Poderia me fornecer mais informações?`

  const navigateToFeed = () => {
    navigation.navigate('home');
  }

  const sendWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=55${data.whatsapp}&text=${message}`)
  }

  const sendMail = () => {
    MailComposer.composeAsync({
        subject: `Adoção de animal - App MyAdopt`,
        recipients: [data.email],
        body: message,
    })
}

  return (
    <Container>
      <ScrollView>
        <Header>
          <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={navigateToFeed}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#e82041" />
          </TouchableOpacity>
          <Logo source={logo} />
        </Header>
        <PetPost data={data} />
        <ContactTitle>Meios de contato disponíveis</ContactTitle>
        <ContactContainer>
          <Action>
            <MaterialCommunityIcons name="chat" size={16} color="#FFF" />
            <ActionText>Chat</ActionText>
          </Action>
          {data.whatsapp && (
            <Action onPress={sendWhatsapp}>
              <MaterialCommunityIcons name="whatsapp" size={16} color="#FFF" />
              <ActionText>WhatsApp</ActionText>
            </Action>
          )}
          <Action onPress={sendMail}>
            <MaterialCommunityIcons name="email" size={16} color="#FFF" />
            <ActionText>E-mail</ActionText>
          </Action>
        </ContactContainer>
      </ScrollView>
    </Container>
  );
}

export default PetDetail;