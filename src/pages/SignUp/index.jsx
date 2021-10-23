import React, { useRef, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

import { Container, Image, Title, StyledInput, StyledInputMask, CityView, CityInput, UfInput, StreetView, StreetInput, NumberInput, LatLongView, LatLongInput } from './styles';

import { Form } from '@unform/mobile';

import logo from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import MultiStep from '../../components/MultiStep';

import api from '../../services/api';

const SignUp = () => {

  const formRef = useRef(null);
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('signin')
  }

  useEffect(() => {
    async function loadInitialPosition() {
        const {granted} = await requestForegroundPermissionsAsync();

        if (granted) {
            const {coords} = await getCurrentPositionAsync({
                enableHighAccuracy: true,
            });
            const {latitude, longitude} = coords;

            formRef.current.setData({
              address: {
                longitude: longitude.toString(),
                latitude: latitude.toString()
              }
            });
        }
    }

    loadInitialPosition();
  }, []);


  const handleSubmit = (data) => {
    alert(JSON.stringify(data))
  }

  const getAddressByZipCode = async () => {
    const zipcode = formRef.current.getFieldValue('address.zipcode');
    if (zipcode.length < 9) return;
    try {
      const { data } = await api.get(`http://viacep.com.br/ws/${zipcode}/json/`);
      formRef.current.setData({
        address: {
          city: data.localidade,
          uf: data.uf,
          neighbourhood: data.bairro,
          street: data.logradouro,
        }
      });
    } catch (err) {
      alert('CEP não encontrado')
    }
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
                <StyledInputMask
                  type={'cpf'}
                  name="cpf" 
                  placeholder="CPF" 
                  hasFocusColor 
                />
                <StyledInput name="password" placeholder="Senha" secureTextEntry />
                <StyledInput name="passwordConfirmation" placeholder="Confirme sua senha" secureTextEntry hasFocusColor />
              </View>

              <View>
                <StyledInputMask 
                  name="phone"
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                  placeholder="WhatsApp (com DDD)" 
                  hasFocusColor
                />
                <StyledInput name="email" placeholder="E-mail" hasFocusColor />
              </View>

              <View>
                <CityView>
                  <CityInput name="address.city" placeholder="Cidade" hasFocusColor />
                  <UfInput name="address.uf" placeholder="UF" hasFocusColor maxLength={2} minLength={2} showError={false}/>
                </CityView>
                <StreetView>
                  <StreetInput name="address.street" placeholder="Rua" hasFocusColor />
                  <NumberInput name="address.number" placeholder="Nº" hasFocusColor showError={false}/>
                </StreetView>

                <StyledInput name="address.neighbourhood" placeholder="Bairro" hasFocusColor />
                <StyledInputMask 
                  name="address.zipcode"
                  type="zip-code"
                  placeholder="Cep" 
                  customOnChange={getAddressByZipCode}
                  hasFocusColor
                />
                
                <LatLongView>
                  <LatLongInput type="only-numbers" name="address.latitude" placeholder="Latitude" hasFocusColor editable={false}/>
                  <LatLongInput  type="only-numbers" name="address.longitude" placeholder="Longitude" hasFocusColor editable={false}/>
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


