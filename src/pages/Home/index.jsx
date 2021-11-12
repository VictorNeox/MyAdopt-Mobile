import React from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import logo from '../../assets/logo.png';

import {
  Container,
  DetailsButton,
  DetailsText,
  Logo,
  NewAdoption,
  NewAdoptionText,
  Title,
  Description,
  Header,
  HeaderText
} from './styles';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import PetPost from '../../components/PetPost';
import { useAuth } from '../../hooks/auth';

const Home = () => {

  const navigation = useNavigation();

  const { user } = useAuth();

  const [mockedData, setMockedData] = useState([
    {
      petId: 1,
      userName: 'Felipe Rodrigues',
      pet: 'cachorro',
      petName: 'Thor',
      gender: 'Macho',
      description: 'Dócil, amigável, brincalhão',
      age: 3,
      size: 'Grande',
      adress: {
        street: 'Luiz Antônio Bertáglia',
        city: 'Americana',
        uf: 'SP'
      },
      petImages: [
        'https://www.petz.com.br/cachorro/racas/husky-siberiano/img/husky-siberiano-caracteristicas-guia-racas.webp',
        'https://www.azpetshop.com.br/blog/wp-content/uploads/2020/12/husky-siberiano-raca.jpg',
        'https://www.infoescola.com/wp-content/uploads/2010/08/husky-siberiano_71212480.jpg'
      ],
      userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png',
      likes: 0,
      isLiked: false,
      latitude: -22.7105902,
      longitude: -47.3170858,
      whatsapp: '19989269050',
      email: 'victordeoliveira.contato@gmail.com',
    },
    {
      petId: 2,
      userName: 'Alisson Alves',
      pet: 'cachorro',
      petName: 'Nick',
      gender: 'Macho',
      description: 'Carinhoso',
      age: 6,
      size: 'grande',
      adress: {
        street: 'Luiz Antônio Bertáglia',
        city: 'Americana',
        uf: 'SP'
      },
      petImages: [
        'https://www.petlove.com.br/images/breeds/193223/profile/original/golden_retriever-p.jpg?1532539102',
        'https://www.petlove.com.br/static/pets/dog/48881/medium_1531952446-photo.jpg',
      ],
      userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png',
      likes: 0,
      isLiked: false,
      latitude: -22.7111918,
      longitude: -47.3169807,
      whatsapp: '19989269050',
      email: 'victordeoliveira.contato@gmail.com',
    },
    {
      petId: 3,
      userName: 'Matheus Linares',
      pet: 'Gato',
      petName: 'Ammy',
      gender: 'Femea',
      description: 'Dócil',
      age: 1,
      size: 'Pequeno',
      adress: {
        street: 'Luiz Antônio Bertáglia',
        city: 'Americana',
        uf: 'SP'
      },
      petImages: [
        'https://ogimg.infoglobo.com.br/in/24649523-8a0-224/FT1086A/x88249115.jpg.pagespeed.ic.GWoSdtcJ_C.jpg',
      ],
      userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png',
      likes: 0,
      isLiked: false,
      latitude: -22.711310293556824,
      longitude: -47.31650895602984,
      whatsapp: '19989269050',
      email: 'victordeoliveira.contato@gmail.com',
    },
  ]);

  const loadPets = async () => {

  }

  const navigateToPetDetail = (data) => {
    data.veterinaryCare = [
        'Vacinação',
        'Castração',
        'Vermifugação'
    ];
    navigation.navigate('petDetail', { petData: data });
  }

  const navigateToNewAdoption = () => {
    navigation.navigate('newAdoption');
  }

  return (
      <Container
        data={mockedData}
        keyExtractor={post => String(post.petId)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadPets}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={(
          <>
            <Header>
                <Logo source={logo} />
                <HeaderText>Total de <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{mockedData.length} animais.</Text></HeaderText>
            </Header>

            <Title>Bem-Vindo(a)!</Title>
            <Description>Selecione um dos animais abaixo para detalhes.</Description>

            <NewAdoption onPress={navigateToNewAdoption} style={{ borderRadius: 8 }}>
              <NewAdoptionText>Nova adoção</NewAdoptionText>
            </NewAdoption>
          </>
        )}
        renderItem={({ item: post }) => (
          <View>
            <PetPost data={post} />
            <DetailsButton onPress={() => navigateToPetDetail(post)} style={{ borderRadius: 8 }}>
              <DetailsText>Ver mais detalhes</DetailsText>
              <MaterialCommunityIcons style={{ marginLeft: 8 }} name="arrow-right" size={16} color="#FFF" />
            </DetailsButton>
          </View>
        )}
      />
  );
}

export default Home;