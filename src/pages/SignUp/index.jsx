import React, { useRef, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

import { Container, Image, Title, StyledInput, StyledInputMask, CityView, CityInput, UfInput, StreetView, StreetInput, NumberInput, LatLongView, LatLongInput } from './styles';

import { Form } from '@unform/mobile';

import logo from '../../assets/logo.png';
import MultiStep from '../../components/MultiStep';

import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {

  const formRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadInitialPosition() {
        const {granted} = await requestForegroundPermissionsAsync();

        if (granted) {
            const {coords} = await getCurrentPositionAsync({
                enableHighAccuracy: true,
            });
            const {latitude, longitude} = coords;
            formRef.current.setData({
              adress: {
                longitude: longitude.toString(),
                latitude: latitude.toString()
              }
            });
        }
    }

    loadInitialPosition();
  }, []);


  const handleSubmit = async (data) => {
    delete data.passwordConfirmation;
    data.adress.longitude = parseFloat(data.adress.longitude);
    data.adress.latitude = parseFloat(data.adress.latitude);
    const addressData = data.adress;
    delete data.adress;
    try {
      const response = await api.post('/user/add', data);
      addressData.fkUserId = response.data.id;
      await api.post('/user/adress/add', addressData);
      Alert.alert('Sucesso', 'Usuário criado com sucesso.');
      console.log(data);
      return navigation.navigate('signin');
    } catch (err) {
      console.log(err.response)
      Alert.alert('Erro', 'Um erro ocorreu, tente novamente.');
    }
  }

  const getAddressByZipCode = async () => {
    const zipcode = formRef.current.getFieldValue('adress.zipcode');
    if (zipcode.length < 9) return;
    try {
      const { data } = await api.get(`http://viacep.com.br/ws/${zipcode}/json/`);
      formRef.current.setData({
        ...formRef.current?.getData(),
        adress: {
          city: data.localidade,
          state: data.uf,
          neighbourhood: data.bairro,
          street: data.logradouro,
          longitude: formRef.current?.getFieldValue('adress.longitude'),
          latitude: formRef.current?.getFieldValue('adress.latitude'),
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
                <StyledInput name="login" placeholder="Usuário" hasFocusColor />
                <StyledInput name="email" placeholder="E-mail" hasFocusColor />
                <StyledInput name="password" placeholder="Senha" secureTextEntry />
                <StyledInput name="passwordConfirmation" placeholder="Confirme sua senha" secureTextEntry hasFocusColor />
              </View>

              <View>
                <StyledInputMask 
                  name="phoneNumber"
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                  placeholder="WhatsApp (com DDD)" 
                  hasFocusColor
                />
              </View>

              <View>
                <CityView>
                  <CityInput name="adress.city" placeholder="Cidade" hasFocusColor />
                  <UfInput name="adress.state" placeholder="UF" hasFocusColor maxLength={2} minLength={2} showError={false}/>
                </CityView>
                <StreetView>
                  <StreetInput name="adress.street" placeholder="Rua" hasFocusColor />
                  <NumberInput name="adress.number" placeholder="Nº" hasFocusColor showError={false}/>
                </StreetView>

                <StyledInput name="adress.neighbourhood" placeholder="Bairro" hasFocusColor />
                <StyledInputMask 
                  name="adress.zipcode"
                  type="zip-code"
                  placeholder="Cep" 
                  customOnChange={getAddressByZipCode}
                  hasFocusColor
                />
                
                <LatLongView>
                  <LatLongInput type="only-numbers" name="adress.latitude" placeholder="Latitude" hasFocusColor editable={false}/>
                  <LatLongInput  type="only-numbers" name="adress.longitude" placeholder="Longitude" hasFocusColor editable={false}/>
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


