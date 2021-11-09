import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParallaxImage } from 'react-native-snap-carousel';
import CustomSlider from './CustomSlider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import logo from '../../assets/logo.png';

import {
  Container,
  UserImage,
  UserContainer,
  UserName,
  PostInformation,
  UserInformation,
  Address,
  PostText,
  LikesContainer,
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

const Home = () => {

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
      address: {
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
    },
    {
      petId: 2,
      userName: 'Víctor Rodrigues',
      pet: 'cachorro',
      petName: 'Nick',
      gender: 'Macho',
      description: 'Dócil, amigável, brincalhão',
      age: 3,
      size: 'grande',
      address: {
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
    },
    {
      petId: 3,
      userName: 'Víctor Rodrigues',
      pet: 'cachorro',
      petName: 'Nick',
      gender: 'Femea',
      description: 'Dócil, amigável, brincalhão',
      age: 3,
      size: 'grande',
      address: {
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
    },
  ]);

  const loadPets = async () => {

  }

  const handleLikePost = (petId) => {
    const pets = mockedData

    const pet = pets.findIndex((obj) => obj.petId === petId);
    if (pets[pet].isLiked) {
      pets[pet].isLiked = false;
      pets[pet].likes--;
    } else {
      pets[pet].isLiked = true;
      pets[pet].likes++;
    }

    setMockedData([...pets])
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

            <Title>Bem-Vindo!</Title>
            <Description>Selecione um dos animais abaixo para detalhes.</Description>

            <NewAdoption style={{ borderRadius: 8 }}>
              <NewAdoptionText>Nova doação</NewAdoptionText>
            </NewAdoption>
          </>
        )}
        renderItem={({ item: post }) => (
          <View>
            <UserContainer>
              <TouchableOpacity style={{ position: 'absolute', right: 16, bottom: 14 }}>
                <MaterialCommunityIcons
                  name='alert'
                  size={22}
                  color='#d12121'
                />
              </TouchableOpacity>
              <UserImage
                source={{ uri: post.userImage }}
                style={{ borderWidth: 2, borderColor: '#e2e2e2', borderRadius: 100 }} />
              <UserInformation>
                <UserName>{post.userName}</UserName>
                <Address>{post.address.street}, {post.address.city} - {post.address.uf}</Address>
              </UserInformation>
            </UserContainer>
            <PostInformation>
              <PostText>
                Nome: {post.petName}
                <MaterialCommunityIcons
                  name={post.gender.toLocaleLowerCase() === 'macho' ? 'gender-male' : 'gender-female'}
                  size={16}
                  color={post.gender.toLocaleLowerCase() === 'macho' ? '#00ADEF' : '#EA168F'}
                />
              </PostText>
              <PostText>Idade: {post.age} anos</PostText>
              <PostText>Porte: {post.size}</PostText>
              <PostText>Descrição: {post.description}</PostText>
            </PostInformation>
            <CustomSlider data={post.petImages} />
            <LikesContainer>
              <MaterialCommunityIcons
                name={post.isLiked ? 'heart' : 'heart-outline'}
                color={post.isLiked ? 'red' : '#6b6b6b'}
                size={26}
                onPress={() => handleLikePost(post.petId)}
              />
              <Text style={{ paddingLeft: 8, opacity: 0.8, fontSize: 16, color: '#6b6b6b' }}>{post.likes}</Text>
            </LikesContainer>
            <DetailsButton style={{ borderRadius: 8 }}>
              <DetailsText>Ver mais detalhes</DetailsText>
              <MaterialCommunityIcons style={{ marginLeft: 8 }} name="arrow-right" size={16} color="#FFF" />
            </DetailsButton>
          </View>
        )}
      />
  );
}

export default Home;