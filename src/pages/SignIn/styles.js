import Constants from 'expo-constants';

import Input from '../../components/Input';

import { TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #7305e1;

  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === "android" ? 50 : 30}px;
`;

export const Header = styled.View`
  display: flex;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 250px;
  height: 250px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin: 10px;
`;

export const StyledInput = styled(Input)`
  width: 250px;
  border-radius: 10px;
  height: 40px;
  margin: 5px 0;
  background-color: #ebd7fe;
`;

export const Actions = styled.View`
  margin-top: 12px;
  flex-direction: column;
  width: 250px;
  justify-content: space-evenly;
`;

export const Action = styled(TouchableOpacity)`
  background-color: #e02041;
  border-radius: 15px;
  height: 40px;
  margin-right: 15px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const ActionText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

export const ForgotYourPass = styled.View`
  align-items: flex-end;
`;

export const ForgotYourPassText = styled.Text`
  color: #fff;
  opacity: 0.6;
  margin-right: 8px;
  font-size: 12px;
`;