import React, { useRef } from 'react';
import { Modal } from 'react-native';

import { Container, ModalView, Action, ActionText, ReportTitle, Actions } from './styles';

import { Form } from '@unform/mobile';

import Input from '../Input';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

const ReportModal = ({ isOpened, setIsOpened }) => {

  const formRef = useRef(null);

  const handleReportPost = async (data) => {
    const schema = Yup.object().shape({
      description: Yup.string().required('Descrição é obrigatória'),
    });

    try {
      formRef.current?.setErrors({});
      await schema.validate(data, { abortEarly: false });
      alert(JSON.stringify(data));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        
        formRef.current?.setErrors(errors);
      }
    }
  }

  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpened}
        onRequestClose={() => {
          setIsOpened(!isOpened);
        }}
      >
        <Container>
          <ModalView>
            <Form ref={formRef} onSubmit={handleReportPost}>
              <ReportTitle>Reportar postagem</ReportTitle>
              <Input 
                multiline={true}
                style={{ width: 200, borderWidth: 1, borderColor: '#A2A2A2', borderRadius: 8 }}
                name="description"
                placeholder="Descreva o motivo"
              />
              <Actions>
                <Action
                  style={{ borderRadius: 8 }}
                  onPress={() => setIsOpened(!isOpened)}
                >
                  <ActionText>Fechar</ActionText>
                </Action>
                <Action onPress={() => formRef.current?.submitForm()} style={{ borderRadius: 8 }}>
                  <ActionText>Enviar</ActionText>
                </Action>
              </Actions>
            </Form>
          </ModalView>
        </Container>
      </Modal>
    </Container>
  );
}

export default ReportModal;