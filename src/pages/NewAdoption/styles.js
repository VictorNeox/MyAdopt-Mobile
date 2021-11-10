import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';
import { TouchableOpacity } from 'react-native';

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
  color: #fff;
  margin: 30px;
`;

export const StyledInput = styled.TextInput`
  width: 250px;
  border-radius: 10px;
  height: 40px;
  margin: 5px 0;
  background-color: #ebd7fe;
  padding: 10px;
`;

export const StyledInputMask = styled(TextInputMask)`
  width: 250px;
  border-radius: 10px;
  height: 40px;
  margin: 5px 0;
  background-color: #ebd7fe;
  padding: 10px;
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
  width: 37%;
  margin: 0 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const UploadImageAction = styled(Action)`
  margin: 5px 0 0 0;
  width: 255px;
`;

export const ActionText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
`;

export const ImagesView = styled.View`
  flex-direction: row;
  width: 250px;
  flex-wrap: wrap;
`;

export const PetImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-right: 8px;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-left: 2px;
  flex-wrap: wrap;
`;