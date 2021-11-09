import styled from 'styled-components/native';
import { StatusBar, Platform, TouchableOpacity, SafeAreaView } from 'react-native';

export const Container = styled(SafeAreaView)`
  background-color: #F2F2F2;
  flex: 1;
  padding-top: ${(props) => Platform.OS === 'android' ? `${StatusBar.currentHeight + 20}px` : '0px'}
`;
export const Header = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  margin: 12px 12px 0 12px;
`;

export const Logo = styled.Image`
  width: 50px;
  height: 50px;
`;

export const ContactContainer = styled.View`
  margin: 12px 0;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const Action = styled(TouchableOpacity)`
  background-color: #7305e1;
  border-radius: 6px;
  height: 40px;
  padding: 0 28px;
  justify-content: center;
  align-items: center;
`;

export const ActionText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

export const ContactTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #616161;
  margin: 12px 0 0 12px;
`;