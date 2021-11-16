import React from 'react';
import { View, Text, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import logo from '../../assets/logo.png';

import {
  Container,
  DetailsButton,
  DetailsText,
  Logo,
  NewAdoptionText,
  Title,
  Description,
  Header,
  HeaderText
} from './styles';
import { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PetPost from '../../components/PetPost';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { useCallback } from 'react';

const Home = () => {

  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const loadPets = async () => {
    try {
      const { data : resData } = await api.get('/feed/all');
      setRefresh(true);
      setData(resData);
      setRefresh(false);
    } catch (err) {
      Alert.alert('Erro', 'Um erro ocorreu no carregamento do feed.');
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadPets();
    }, [])
  );

  const navigateToPetDetail = (petId) => {
    navigation.navigate('petDetail', { petId });
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

  if (refresh) return null;
  
  return (
    <>
      {data.length < 1 && <View />}
      <Container
        data={data}
        keyExtractor={data => String(data.pet.pet_id)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={(
          <>
            <Header>
                <Logo source={logo} />
                <HeaderText>Total de <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{data.length} animais.</Text></HeaderText>
            </Header>

            <Title>Bem-Vindo(a)!</Title>
            <Description>Selecione um dos animais abaixo para detalhes.</Description>
          </>
        )}
        ListFooterComponent={() => {
          if (data.length != 0) return null;
          return (
            <View>
              <NewAdoptionText style={{ fontWeight: 'bold', marginTop: 12, color: 'gray', textAlign: 'center' }}>Nenhuma adoção disponível no momento.</NewAdoptionText>
            </View>
          )
        }}
        renderItem={({ item }) => (
          <View>
            <PetPost data={item} handleLikePost={handleLikePost}/>
            <DetailsButton onPress={() => navigateToPetDetail(item.pet.pet_id)} style={{ borderRadius: 8 }}>
              <DetailsText>Ver mais detalhes</DetailsText>
              <MaterialCommunityIcons style={{ marginLeft: 8 }} name="arrow-right" size={16} color="#FFF" />
            </DetailsButton>
          </View>
        )}
      />
    </>
  );
}

export default Home;