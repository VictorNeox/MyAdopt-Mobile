import styled, { css } from 'styled-components/native';

export const TextInput = styled.TextInput`

  ${props => !(props.isFocused && props.hasFocusColor) && css`
    border: none;
  `}

  ${props => (props.isErrored) && css`
    border: 1px solid red;
  `}

  ${props => (props.isFocused && props.hasFocusColor) && css`
    border: 1px solid #4dd0e1;
  `}
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-left: 2px;
`;