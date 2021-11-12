import React, { useEffect, useState } from 'react';
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

import { Alert, Linking, ScrollView, TouchableOpacity } from 'react-native';

import capitalize from '../../utils/capitalize';

import * as MailComposer from 'expo-mail-composer';
import api from '../../services/api';

const PetDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [data, setData] = useState({});

  const { petId } = route.params;
  let message = '';

  const navigateToFeed = () => {
    navigation.navigate('home');
  }

  const sendWhatsapp = async () => {
    try {
      await Linking.openURL(`whatsapp://send?phone=55${data.user.phoneNumber}&text=${message}`)
    } catch (err) {
      alert('Erro ao abrir o whatsapp');
    }
  }

  const handleLikePost = (petId) => {
    const index = data.findIndex((value, index) => value.pet.pet_id === petId);

    const pets = data;

    if (pets[index].post.isLiked) {
      pets[index].post.isLiked = false;
      pets[index].post.likes--;
    } else {
      pets[index].post.isLiked = true;
      pets[index].post.likes++;
    }

    setData([...pets]);
  }


  const sendMail = () => {
    MailComposer.composeAsync({
      subject: `Adoção de animal - App MyAdopt`,
      recipients: [data.email],
      body: message,
    })
  }

  useEffect(() => {
    async function loadPet() {
      try {
        const { data: feedData } = await api.get(`/feed/findAllFeedByPetId?id=${petId}`);
        const { data: vetData } = await api.get(`/pet/vetcare/findAllByPetId?id=${petId}`);

        const veterinaryCares = vetData[0].description.split(',');
        setData({...feedData[0], veterinaryCares});
        message = `Olá ${feedData[0].user.user_name}, estou entrando em contato pois tenho interesse no animal de estimação ${capitalize(feedData[0].pet.name)} anunciado no aplicativo MyAdopt. Poderia me fornecer mais informações?`

      } catch (err) {
        console.log(err)
        Alert.alert('Um erro ocorreu buscando dados do pet.');
      }
    }
    loadPet();
  }, []);

  return (
    <Container>
      <ScrollView>
        <Header>
          <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={navigateToFeed}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#e82041" />
          </TouchableOpacity>
          <Logo source={logo} />
        </Header>
        {Object.keys(data).length > 0 && (
          <>
            <PetPost data={data} handleLikePost={handleLikePost}/>
            <ContactTitle>Meios de contato disponíveis</ContactTitle>
            <ContactContainer>
              <Action>
                <MaterialCommunityIcons name="chat" size={16} color="#FFF" />
                <ActionText>Chat</ActionText>
              </Action>
              {data.user.phoneNumber && (
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
          </>
        )}
      </ScrollView>
    </Container>
  );
}

export default PetDetail;