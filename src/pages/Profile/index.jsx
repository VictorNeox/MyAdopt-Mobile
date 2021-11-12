import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

import logo from '../../assets/logo.png';

import {
  Container,
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

const Profile = () => {

  const navigation = useNavigation();

  const { user } = useAuth();

  // useEffect(() => {
  //   if (!user) {
  //     navigation.navigate('signin');
  //   }
  // }, []);

  const [mockedData, setMockedData] = useState([
    {
      petId: 1,
      userName: 'Víctor Rodrigues',
      pet: 'cachorro',
      petName: 'Nick',
      gender: 'Macho',
      description: 'Dócil, amigável, brincalhão',
      age: 3,
      size: 'grande',
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
      whatsapp: '19989269050',
      email: 'victordeoliveira.contato@gmail.com',
    },
  ]);

  const loadPets = async () => {

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
                <HeaderText>Total de <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{mockedData.length - 1} animais.</Text></HeaderText>
            </Header>

            <Title>Bem-Vindo!</Title>
            <Description>Aqui você pode visualizar suas adoções criadas.</Description>

            <NewAdoption onPress={navigateToNewAdoption} style={{ borderRadius: 8 }}>
              <NewAdoptionText>Nova adoção</NewAdoptionText>
            </NewAdoption>
          </>
        )}
        renderItem={({ item: post }) => (
          <View>
              <NewAdoptionText style={{ fontWeight: 'bold', marginTop: 12, color: 'gray', textAlign: 'center' }}>Você não criou nenhuma postagem.</NewAdoptionText>
            {/* <PetPost data={post} isProfile={true}/> */}
          </View>
        )}
      />
  );
}

export default Profile;