import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import Input from '../../components/Input';

export const Container = styled.View`
  background-color: #7305e1;

  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === "android" ? 50 : 30}px;
`;

export const Image = styled.Image`
  width: 100px;
  height: 100px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff
  margin: 30px;
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
  flex-direction: row;
  justify-content: space-around;
`;

export const Action = styled(TouchableOpacity)`
  background-color: #e02041;
  border-radius: 15px;
  height: 40px;
  width: 35%;
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

export const CityView = styled.View`
  flex-direction: row;
`;

export const CityInput = styled(StyledInput)`
  width: 195px;
`;

export const UfInput = styled(StyledInput)`
  width: 50px;
  margin-left: 5px;
`;

export const StreetView = styled(CityView)`
`;

export const StreetInput = styled(StyledInput)`
  width: 195px;
`;

export const NumberInput = styled(StyledInput)`
  width: 50px;
  margin-left: 5px;
`;

export const LatLongView = styled(CityView)`
`;

export const LatLongInput = styled(StyledInput)`
  width: 122px;
  margin-right: 5px;
`;