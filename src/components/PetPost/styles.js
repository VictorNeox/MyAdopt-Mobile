import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1
`;

export const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
`;

export const UserInformation = styled.View`
  padding-top: 30px;
  padding-left: 10px;
  color: #616161;
`;

export const UserName = styled.Text`
  color: #2b2b2b;
`;


export const Address = styled.Text`
  font-size: 10px;
  color: #2b2b2b;
`;

export const UserImage = styled.Image`
  margin-top: 35px;
  width: 35px;
  height: 35px;
`;

export const PostInformation = styled.View`
  padding: 10px 12px;
`;

export const PostText = styled.Text`
  color: #616161;
`;

export const LikesContainer = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
`;