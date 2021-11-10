import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Logo, Header, Title, TextInput, Actions, Action, ActionText, ForgotYourPass, ForgotYourPassText, StyledInput } from './styles';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';

import logo from '../../assets/logo.png';

import getValidationErrors from '../../utils/getValidationErrors';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';

import { useAuth } from '../../hooks/auth';

const SignIn = () => {
  const navigation = useNavigation();
  
  const { signIn } = useAuth();

  const formRef = useRef(null);

  const navigateToRegister = () => {
    navigation.navigate('signup');
  }

  const navigateToHome = () => {
    navigation.navigate('root', { screen: 'home' });
  }

  const handleSubmit = async (data) => {

    const schema = Yup.object().shape({
      login: Yup.string().required('Usuário é obrigatório'),
      password: Yup.string().required('Senha é obrigatória'),
    });
    
    try {
      formRef.current?.setErrors({});
      await schema.validate(data, { abortEarly: false });

      signIn(data)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        
        formRef.current?.setErrors(errors);
      }
    }
  }

  return (
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"} enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >

          <Container>
              <Logo source={logo} />
              <View>
                <Title>Faça seu login</Title>
              </View>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <StyledInput name="login" placeholder="Usuário" hasFocusColor />
                <StyledInput name="password" placeholder="Senha" type="password" secureTextEntry hasFocusColor/>

                <ForgotYourPass>
                  <ForgotYourPassText>Esqueceu sua senha?</ForgotYourPassText>
                </ForgotYourPass>
                <Actions>

                  <Action onPress={() => formRef.current?.submitForm()}>
                    <ActionText>Entrar</ActionText>
                  </Action>

                  <Action onPress={navigateToRegister}>
                    <ActionText>Registre-se</ActionText>
                  </Action>
                </Actions>
              </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}

export default SignIn;