import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Container, Logo, HeaderText, TextInput, Actions, Action, ActionText, ForgotYourPass, ForgotYourPassText, StyledInput } from './styles';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';

import logo from '../../assets/logo.png';

import getValidationErrors from '../../utils/getValidationErrors';

const SignIn = () => {
  const navigation = useNavigation();

  const formRef = useRef(null);

  const navigateToRegister = () => {
    navigation.navigate('register');
  }

  const handleSubmit = async (data) => {

    const schema = Yup.object().shape({
      user: Yup.string().required('Usuário é obrigatório'),
      password: Yup.string().required('Senha é obrigatória'),
    });

    try {
      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        
        formRef.current?.setErrors(errors);
      }
    }
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "#7305e1" }} >
      <Container>
        <Logo source={logo} />
        <HeaderText>Faça seu login</HeaderText>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <StyledInput name="user" placeholder="Usuário" hasFocusColor />
          <StyledInput name="password" placeholder="Senha" type="password" secureTextEntry={true} hasFocusColor/>

          <ForgotYourPass>
            <ForgotYourPassText>Esqueceu sua senha?</ForgotYourPassText>
          </ForgotYourPass>
          <Actions>

            <Action onPress={() => formRef.current.submitForm()}>
              <ActionText>Entrar</ActionText>
            </Action>

            <Action onPress={navigateToRegister}>
              <ActionText>Registre-se</ActionText>
            </Action>
          </Actions>
        </Form>
      </Container>
    </KeyboardAwareScrollView>
  );
}

export default SignIn;