import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native-gesture-handler';

export const Actions = styled.View`
  margin-top: 12px;
  flex-direction: row;
  justify-content: space-around;
`;

export const Action = styled(TouchableOpacity)`
  background-color: #e02041;
  border-radius: 15px;
  height: 40px;
  width: 120px;
  margin: 0 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const ActionText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;