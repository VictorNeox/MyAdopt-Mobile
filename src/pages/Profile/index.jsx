import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';

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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import PetPost from '../../components/PetPost';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { useCallback } from 'react';
import SignOutButton from '../../components/SignOutButton';

const Profile = () => {

  const navigation = useNavigation();

  const { user } = useAuth();

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useFocusEffect(() => {
    if (!user) {
      navigation.navigate('signin');
    }
  });

  const loadPets = async () => {
    try {
      const { data: resData } = await api.get(`/feed/findAllFeedByUserId?id=${user.id}`);
      setRefresh(true);
      setData([...resData]);
      setRefresh(false);
    } catch (err) {
      Alert.alert('Erro', 'Um erro ocorreu, tente novamente.');

      console.log(err)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadPets();
    }, [])
  );

  const navigateToNewAdoption = () => {
    navigation.navigate('newAdoption');
  }

  if (refresh) return null;

  return (
    <Container
      data={data}
      extraData={data}
      keyExtractor={post => String(post.pet.pet_id)}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={() => {
        if (data.length != 0) return null;
        return (
          <View>
            <NewAdoptionText style={{ fontWeight: 'bold', marginTop: 12, color: 'gray', textAlign: 'center' }}>Você não criou nenhuma postagem.</NewAdoptionText>
          </View>
        )
      }}
      ListHeaderComponent={(
        <>
          <Header>
            <Logo source={logo} />
            <View>
              <SignOutButton />
              <HeaderText>Total de <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{data.length} animais.</Text></HeaderText>
            </View>
          </Header>

          <Title>Bem-Vindo(a)!</Title>
          <Description>Aqui você pode visualizar suas adoções criadas.</Description>

          <NewAdoption onPress={navigateToNewAdoption} style={{ borderRadius: 8 }}>
            <NewAdoptionText>Nova adoção</NewAdoptionText>
          </NewAdoption>
        </>
      )}
      renderItem={({ item: post }) => (
        <PetPost data={post} isProfile={true} loadPets={loadPets} />
      )}
    />
  );
}

export default Profile;