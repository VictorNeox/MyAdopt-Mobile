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

const PetPost = ({ data, isProfile, handleLikePost }) => {

  const [reportModal, setReportModal] = useState(false);

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
          <TouchableOpacity onPress={() => handleDeletePost(data.post.pet_post_id)} style={{ position: 'absolute', right: 16, bottom: 14 }}>
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
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png' }}
          style={{ borderWidth: 2, borderColor: '#e2e2e2', borderRadius: 100 }} />
        <UserInformation>
          <UserName>{data.user.user_name}</UserName>
          <Address>{data.user.street}, {data.user.city} - {data.user.state}</Address>
        </UserInformation>
      </UserContainer>
      <CustomSlider data={data.petImages} />
      <PostInformation>
        <PostText>
          Nome: {data.pet.name}
          <MaterialCommunityIcons
            name={data.pet.gender.toLocaleLowerCase() === 'm' ? 'gender-male' : 'gender-female'}
            size={16}
            color={data.pet.gender.toLocaleLowerCase() === 'm' ? '#00ADEF' : '#EA168F'}
          />
        </PostText>
        <PostText>Idade: {data.pet.age} anos</PostText>
        <PostText>Porte: {data.pet.size}</PostText>
        <PostText>Descrição: {data.post.description}</PostText>
        {data.veterinaryCares && (
          <>
            <PostText style={{ fontWeight: 'bold', marginTop: 12 }}>Cuidados veterinários</PostText>
            {data.veterinaryCares.map((care, index) => (
              <PostText key={index}>
                {capitalize(care).trim()}
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
              name={data.post.isLiked ? 'heart' : 'heart-outline'}
              color={data.post.isLiked ? 'red' : '#6b6b6b'}
              size={26}
              onPress={() => handleLikePost(data.pet.pet_id)}
            />
            <Text style={{ paddingLeft: 8, opacity: 0.8, fontSize: 16, color: '#6b6b6b' }}>{data.post.likes}</Text>
          </LikesContainer>
          <ReportModal isOpened={reportModal} setIsOpened={setReportModal} />
        </>
      )}
    </Container>
  );
}

export default PetPost;