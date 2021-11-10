import styled from 'styled-components/native';
import { StatusBar, Platform, TouchableOpacity } from 'react-native';

export const Container = styled.FlatList`
  background-color: #F2F2F2;
  flex: 1;
`;

export const Header = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  padding-top: ${(props) => Platform.OS === 'android' ? `${StatusBar.currentHeight + 20}px` : '0px' }
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

export const DetailsButton = styled(TouchableOpacity)`
  margin-right: 10px;
  margin-bottom: 8px;
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