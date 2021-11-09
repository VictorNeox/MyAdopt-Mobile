import styled from 'styled-components/native';
import { StatusBar, Platform, TouchableOpacity } from 'react-native';

export const Container = styled.View`
  background-color: #F2F2F2;
  flex: 1;
  padding: 0 0px ${Platform.OS === "android" ? 50 : 30}px;
  padding-top: ${(props) => Platform.OS === 'android' ? `${StatusBar.currentHeight + 10}px` : '0px' }
`;

export const Header = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  margin: 12px 12px 0 12px;
`;

export const HeaderText = styled.Text`
  fontSize: 15px;
  color: #737380;
  margin-right: 10px;
`;

export const Title = styled.Text`
  margin-left: 16px;
  font-size: 30px;
  margin-bottom: 6px;
  margin-top: 20px;
  color: #13131a;
  fontWeight: bold;
`;

export const Description = styled.Text`
  margin-left: 16px;
  fontSize: 16px;
  lineHeight: 24px;
  color: #737380;
`;

export const Logo = styled.Image`
  width: 50px;
  height: 50px;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
`;

export const UserInformation = styled.View`
  padding-top: 30px;
  padding-left: 10px;
  color: #4d4d4d;
`;

export const UserName = styled.Text`

`;


export const Address = styled.Text`
  font-size: 10px;
`;

export const UserImage = styled.Image`
  margin-top: 35px;
  width: 35px;
  height: 35px;
`
export const PetImage = styled.Image`
  height: 250px;
  width: 100%;
`;

export const PostInformation = styled.View`
  padding: 10px 20px;
`;

export const PostText = styled.Text`
  color: #41414d;
`;

export const LikesContainer = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
`;

export const DetailsButton = styled(TouchableOpacity)`
  margin-right: 10px;
  height: 40px;
  width: 45%;
  justifyContent: center;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  background-color: #7305e1;
`;

export const DetailsText = styled.Text`
  color: #fff;
  fontSize: 15px;
  fontWeight: bold;
`;

export const NewAdoption = styled(TouchableOpacity)`
  margin: 16px 10px 16px 0;
  align-self: flex-end;
  height: 35px;
  width: 30%;
  justifyContent: center;
  flex-direction: row;
  align-items: center;
  background-color: #7305e1;
`;

export const NewAdoptionText = styled.Text`
  color: #fff;
  fontWeight: bold;
`;