import { TouchableOpacity, StatusBar, Platform } from 'react-native';
import styled from 'styled-components/native';

export const SearchForm = styled.View`
  position: absolute;
  top: 50px;
  top: ${(props) => Platform.OS === 'android' ? `${StatusBar.currentHeight + 20}px` : '0px' }
  left: 20px;
  right: 20px;
  z-index: 5;
  display: flex;
  flexDirection: row;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 50px;
  backgroundColor: #FFF;
  color: #333;
  borderRadius: 25px;
  padding: 0 20px;
  font-size: 16px;
  shadow-color: #000;
  shadow-opacity: 0.2;

  elevation: 4;
`;

export const LoadButton = styled(TouchableOpacity)`
  width: 50px
  height: 50px
  background-color: #8E4DFF;
  justify-content: center;
  align-items: center;
  margin-left: 15px
`;