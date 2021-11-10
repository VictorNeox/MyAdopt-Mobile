import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

export const ModalView = styled.View`
  margin: 20px;
  backgroundColor: white;
  padding: 35px;
  align-items: center;

`;

export const ModalText = styled.Text`
  margin-bottom: 15px;
  text-align: center;

`;

export const Actions = styled.View`
  margin-top: 12px;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const Action = styled(TouchableOpacity)`
  padding: 10px;
  width: 97px;
  elevation: 2;
  background-color: #7305e1;
  margin-right: 8px
`;

export const ActionText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const ReportTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
  color: #3b3b3b;
`;