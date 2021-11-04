import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;

  flex: 1;
  padding: 0 30px ${Platform.OS === "android" ? 50 : 30}px;
`;