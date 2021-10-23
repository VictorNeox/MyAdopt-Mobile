import React, { useRef } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';

import { Container, Image, Title, StyledInput, CityView, CityInput, UfInput, StreetView, StreetInput, NumberInput, LatLongView, LatLongInput } from './styles';

import { Form } from '@unform/mobile';

import logo from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import MultiStep from '../../components/MultiStep';

const SignUp = () => {

  const formRef = useRef(null);
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('signin')
  }


  const handleSubmit = (data) => {
    let string = '';
    Object.keys(data)
    .forEach(function eachKey(key) { 
      string += `[${key}]: ${data[key]},`;
    });
    alert(string)
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="never"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logo} />
          <Title>Cadastro de usuário</Title>

          <Form ref={formRef} style={{ justifyContent: 'center', alignItems: 'center' }} onSubmit={handleSubmit}>
            <MultiStep formRef={formRef}>
              <View>
                <StyledInput name="name" placeholder="Nome completo" hasFocusColor />
                <StyledInput name="user" placeholder="Usuário" hasFocusColor />
                <StyledInput name="password" placeholder="Senha" secureTextEntry />
                <StyledInput name="passwordConfirmation" placeholder="Confirme sua senha" secureTextEntry hasFocusColor />
              </View>

              <View>
                <StyledInput name="phone" placeholder="WhatsApp (com DDD)" hasFocusColor maxLength={11} minLength={11}/>
                <StyledInput name="email" placeholder="E-mail" hasFocusColor />
              </View>

              <View>
                <CityView>
                  <CityInput name="city" placeholder="Cidade" hasFocusColor />
                  <UfInput name="uf" placeholder="UF" hasFocusColor maxLength={2} minLength={2}/>
                </CityView>
                <StreetView>
                  <StreetInput name="street" placeholder="Rua" hasFocusColor />
                  <NumberInput name="number" placeholder="Nº" hasFocusColor />
                </StreetView>

                <StyledInput name="neighbourhood" placeholder="Bairro" hasFocusColor />
                <StyledInput name="zipcode" placeholder="Cep" hasFocusColor />
                
                <LatLongView>
                  <LatLongInput  name="latitude" placeholder="Latitude" hasFocusColor disable/>
                  <LatLongInput  name="longitude" placeholder="Longitude" hasFocusColor disable/>
                </LatLongView>
              </View>

            </MultiStep>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView> 
  );
}

export default SignUp;


