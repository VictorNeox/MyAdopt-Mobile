import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { Action, Actions, ActionText } from './styles';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import StepIndicator from 'react-native-step-indicator';

const MultiStep = ({ children, formRef }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const numberOfSteps = children.length;

  const navigation = useNavigation();

  const labels = ["Informações básicas", "Contato", "Endereço"];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#4dd0e1',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#4dd0e1',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#4dd0e1',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#4dd0e1',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: 'black',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#4dd0e1'
  }

  const handleNextStep = async () => {
    formRef.current?.setErrors({});
    if (currentStep === 0 && !await handleValidateFirstStep()) return;
    else if (currentStep === 1 && !await handleValidateSecondStep()) return;
    else if (currentStep === 2 && !await handleValidateThirdStep()) return;

    if (currentStep === numberOfSteps - 1) {
      return formRef.current?.submitForm();
    }


    setCurrentStep(currentStep + 1);
  }

  const handlePreviousStep = () => {
    if (currentStep === 0) {
      return navigation.navigate('signin');
    }

    setCurrentStep(currentStep - 1);
  }



  const handleValidateFirstStep = async () => {
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      login: Yup.string().required('Usuário é obrigatório'),
      password: Yup.string().min(8, 'Mínimo de 8 caractéres').required('Senha é obrigatória'),
      passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Confirmação não confere').required('Confirmação de senha é obrigatória'),
    });

    try {
      const formData = await formRef.current.getData();
      await schema.validate(formData, { abortEarly: false });

      return true;
    } catch (err) {
      const errors = getValidationErrors(err);
      
      formRef.current?.setErrors(errors);
      return false;
    }
  }


  const handleValidateSecondStep = async () => {
    const schema = Yup.object().shape({
      phoneNumber: Yup.string().max(16, 'Whatsapp deve ter 11 números.').min(11, 'Whatsapp deve ter 11 números.').required('Whatsapp é obrigatório'),
      email: Yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
    });

    try {
      const formData = await formRef.current.getData();
      await schema.validate(formData, { abortEarly: false });

      return true;
    } catch (err) {
      const errors = getValidationErrors(err);
      
      formRef.current?.setErrors(errors);
      return false;
    }
  }

  const handleValidateThirdStep = async () => {
    const schema = Yup.object().shape({
      adress: Yup.object().shape({
        city: Yup.string().required('Cidade é obrigatória'),
        uf: Yup.string().max(2).min(2).required('UF é obrigatório'),
        street: Yup.string().required('Rua é obrigatória'),
        number: Yup.string().required('Número é obrigatório'),
        neighbourhood: Yup.string().required('Bairro é obrigatório'),
        zipcode: Yup.string().required('Cep é obrigatório'),
      })
    });

    
    try {
      const formData = await formRef.current.getData();

      await schema.validate(formData, { abortEarly: false });

      return true;
    } catch (err) {
      const errors = getValidationErrors(err);
      
      formRef.current?.setErrors(errors);
      return false;
    }
  }

  return (
    <View>
      <View style={{ marginBottom: 18 }}>
        <StepIndicator
            customStyles={customStyles}
            currentPosition={currentStep}
            labels={labels}
            stepCount={numberOfSteps}
        />
      </View>
      {children.map((step, index) => {
          let style = {};

          if (currentStep !== index) style = { opacity: 0, height: 0 };
          return (
            <View key={`step_${index}`} style={style}>
                {step}
            </View>
          );
      })}
      <Actions>

        <Action onPress={handlePreviousStep}>
          <ActionText >Voltar</ActionText>
        </Action>

        <Action onPress={handleNextStep}>
          <ActionText>Avançar</ActionText>
        </Action>
      </Actions>
    </View>
  );
}

export default MultiStep;