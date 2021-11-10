import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  UserContainer,
  UserImage,
  UserInformation,
  UserName,
  Address,
  PostInformation,
  PostText,
  LikesContainer,
} from './styles';

import CustomSlider from '../CustomSlider';

import capitalize from '../../utils/capitalize';
import ReportModal from '../ReportModal';
import api from '../../services/api';

const PetPost = ({ data: post, isProfile }) => {

  const [data, setData] = useState(post);

  const [reportModal, setReportModal] = useState(false);

  const handleLikePost = (petId) => {
    const pet = data

    if (pet.isLiked) {
      pet.isLiked = false;
      pet.likes--;
    } else {
      pet.isLiked = true;
      pet.likes++;
    }

    setData({ ...pet });
  }

  const handleReportModal = () => {
    setReportModal(!reportModal);
  }

  const handleDeletePost = async (index) => {
    try {
      await api.delete(`/pet/post/delete?id=${index}`);
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um erro, tente novamente.');
    }
  }

  return (
    <Container>
      <UserContainer>
        {isProfile ? (
          <TouchableOpacity onPress={() => handleDeletePost(data.petId)} style={{ position: 'absolute', right: 16, bottom: 14 }}>
            <MaterialCommunityIcons
              name='delete-outline'
              size={22}
              color='#616161'
            />
          </TouchableOpacity>
        )
        : (
          <TouchableOpacity onPress={handleReportModal} style={{ position: 'absolute', right: 16, bottom: 14 }}>
            <MaterialCommunityIcons
              name='alert'
              size={22}
              color='#d12121'
          />
          </TouchableOpacity>
        )}

        <UserImage
          source={{ uri: data.userImage }}
          style={{ borderWidth: 2, borderColor: '#e2e2e2', borderRadius: 100 }} />
        <UserInformation>
          <UserName>{data.userName}</UserName>
          <Address>{data.adress.street}, {data.adress.city} - {data.adress.uf}</Address>
        </UserInformation>
      </UserContainer>
      <CustomSlider data={data.petImages} />
      <PostInformation>
        <PostText>
          Nome: {data.petName}
          <MaterialCommunityIcons
            name={data.gender.toLocaleLowerCase() === 'macho' ? 'gender-male' : 'gender-female'}
            size={16}
            color={data.gender.toLocaleLowerCase() === 'macho' ? '#00ADEF' : '#EA168F'}
          />
        </PostText>
        <PostText>Idade: {data.age} anos</PostText>
        <PostText>Porte: {data.size}</PostText>
        <PostText>Descrição: {data.description}</PostText>
        {data.veterinaryCare && (
          <>
            <PostText style={{ fontWeight: 'bold', marginTop: 12 }}>Cuidados veterinários</PostText>
            {data.veterinaryCare.map((care, index) => (
              <PostText key={index}>
                {capitalize(care)}
                <MaterialCommunityIcons
                  style={{ marginLeft: 16 }}
                  name={'check'}
                  color={'green'}
                  size={16}
                />
              </PostText>
            ))}
          </>
        )}
      </PostInformation>
      {!isProfile && (
        <>
          <LikesContainer>
            <MaterialCommunityIcons
              name={data.isLiked ? 'heart' : 'heart-outline'}
              color={data.isLiked ? 'red' : '#6b6b6b'}
              size={26}
              onPress={handleLikePost}
            />
            <Text style={{ paddingLeft: 8, opacity: 0.8, fontSize: 16, color: '#6b6b6b' }}>{data.likes}</Text>
          </LikesContainer>
          <ReportModal isOpened={reportModal} setIsOpened={setReportModal} />
        </>
      )}
    </Container>
  );
}

export default PetPost;