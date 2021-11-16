import React, { useRef, useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, Image, Title, StyledInput, ErrorText, ActionText, ImagesView, PetImage, UploadImageAction } from './styles';
import SelectDropdown from 'react-native-select-dropdown'
import logo from '../../assets/logo.png';
const { width, height } = Dimensions.get("window");

import MultiStep from './MultiStep';

import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';


const NewAdoption = () => {
  const formRef = useRef(null);

  const genders = ['Macho', 'Fêmea'];
  const sizes = ['Grande', 'Médio', 'Pequeno'];
  const [images, setImages] = useState([]);

  const [name, setName] = useState('');

  const [age, setAge] = useState('');

  const [description, setDescription] = useState('');

  const [veterinaryCares, setVeterinaryCares] = useState('');

  const [type, setType] = useState('');

  const [gender, setGender] = useState('');

  const [size, setSize] = useState('');

  const [errors, setErrors] = useState({});

  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos de permissão à suas fotos para funcionar!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const data = images;

    if (!result.cancelled) {
      data.push(result.uri);
      setImages([...data]);
    }
  };

  const getData = () => {
    const data = {
      name,
      age: parseInt(age) || 0,
      description,
      gender,
      size,
      type,
      veterinaryCares: veterinaryCares,
      images
    };
    return data;
  }

  const handleValidateFirstStep = async () => {
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      age: Yup.number().required('Idade é obrigatória'),
      veterinaryCares: Yup.string(),
      gender: Yup.string().required('Sexo é obrigatório'),
    });

    try {
      setErrors({});
      const data = getData();
      console.log(data);
      await schema.validate(data, { abortEarly: false });

      return true;
    } catch (err) {
      console.log(err)
      const errors = getValidationErrors(err);

      setErrors(errors)
      return false;
    }
  }

  const handleValidateSecondStep = async () => {
    const schema = Yup.object().shape({
      description: Yup.string().required('Descrição é obrigatória'),
      size: Yup.string().required('Porte é obrigatório'),
      images: Yup.array().min(1, 'Necessário pelo menos 1 foto').required('Imagem é obrigatória'),
    });

    try {
      setErrors({});
      const data = getData();
      await schema.validate(data, { abortEarly: false });

      return true;
    } catch (err) {
      const errors = getValidationErrors(err);
      setErrors(errors)
      return false;
    }
  }

  const handleSubmit = async () => {
    const data = getData();

    try {
      const { data: petData } = await api.post('/pet/add', {
        name: data.name,
        age: data.age,
        type: data.type,
        gender: data.gender,
        size: data.size,
      });

      await api.post('pet/vetcare/add', {
        description: veterinaryCares,
        has_veterinary_care: true,
        fkPetId: petData.id
      });

      const body = new FormData();

      const formImages = images;

      for (let i in formImages) {
        let filename = formImages[i].split('/').pop();
        body.append('image', { uri: formImages[i], name: filename, type: 'multipart/form-data' });
      }

      await api.post(`pet/add/image?id=${petData.id}`, body, {
        headers: {
          "Content-Type": `multipart/form-data`,
        }
      });

      await api.post('/pet/post/add', {
        description,
        likes: 0,
        fkPetId: petData.id,
        created_at: "2021-11-14"
      });

      Alert.alert('Sucesso', 'Adoção criada com sucesso.');
      navigation.navigate('root', { screen: 'profile' });
      
    } catch (err) {
      Alert.alert('Erro', 'Um erro ocorreu, tente novamente');
      console.log(err)
    }

    // Alert.alert('Sucesso', 'Adoção criada com sucesso.');
    // navigation.navigate('root', { screen: 'home' });
  }

  const handleDeleteImage = (index) => {
    const data = images;
    data.splice(index, 1);
    setImages([...data]);
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
          <Title>Cadastro de pet</Title>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MultiStep
              handleSubmit={handleSubmit}
              handleValidateFirstStep={handleValidateFirstStep}
              handleValidateSecondStep={handleValidateSecondStep}
            >
              <View>
                {errors.name && (<ErrorText>{errors.name}</ErrorText>)}
                <StyledInput name="name" placeholder="Nome" value={name} onChangeText={setName} />
                {errors.age && (<ErrorText>{errors.age}</ErrorText>)}
                <StyledInput name="age" keyboardType='numeric' placeholder="Idade" value={age.toString()} onChangeText={setAge} />
                <StyledInput name="veterinaryCares" placeholder="Cuidados (separados por vírgula)" value={veterinaryCares} onChangeText={setVeterinaryCares} />
                <StyledInput name="type" placeholder="Espécie" value={type} onChangeText={setType} />
                {errors.gender && (<ErrorText>{errors.gender}</ErrorText>)}
                <SelectDropdown
                  data={genders}
                  onSelect={(selectedItem, index) => {
                    const value = selectedItem.toLowerCase();
                    if (value === 'macho') setGender('M');
                    if (value === 'fêmea') setGender('F');
                  }}
                  defaultButtonText={"Selecione o sexo"}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={styles.dropdown1BtnStyle}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={() => {
                    return (
                      // <FontAwesome name="chevron-down" color={"#444"} size={18} />
                      <MaterialCommunityIcons name="chevron-down" size={18} color="#444" />
                    );
                  }}
                  dropdownIconPosition={"right"}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                />
              </View>
              <View>
                {errors.description && (<ErrorText>{errors.description}</ErrorText>)}
                <StyledInput name="description" placeholder="Descrição" value={description} onChangeText={setDescription} />
                {errors.size && (<ErrorText>{errors.size}</ErrorText>)}
                <SelectDropdown
                  data={sizes}
                  onSelect={(selectedItem, index) => {
                    const value = selectedItem.toLowerCase();
                    if (value === 'grande') setSize('large');
                    if (value === 'médio') setSize('medium');
                    if (value === 'pequeno') setSize('small');
                  }}
                  defaultButtonText={"Selecione o porte"}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={styles.dropdown1BtnStyle}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={() => {
                    return (
                      // <FontAwesome name="chevron-down" color={"#444"} size={18} />
                      <MaterialCommunityIcons name="chevron-down" size={18} color="#444" />
                    );
                  }}
                  dropdownIconPosition={"right"}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                />
                {errors.images && (<ErrorText>{errors.images}</ErrorText>)}
                <UploadImageAction style={{ marginTop: 5, width: 250 }} onPress={pickImage}>
                  <ActionText>Selecionar imagem</ActionText>
                </UploadImageAction>
                <ImagesView>
                  {images.map((image, index) => (
                    <View key={index} style={{ position: 'relative', marginTop: 16, }}>
                      <TouchableOpacity onPress={() => handleDeleteImage(index)}>
                        <MaterialCommunityIcons name="delete" size={18} color="#ebd7fe" />
                      </TouchableOpacity>
                      <PetImage source={{ uri: image }} style={{ borderRadius: 8 }} />
                    </View>
                  ))}
                </ImagesView>
              </View>
            </MultiStep>

          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    width,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
  },
  headerTitle: { color: "#000", fontWeight: "bold", fontSize: 14 },
  saveAreaViewContainer: { flex: 1, backgroundColor: "#000" },
  viewContainer: { flex: 1, width: 550, backgroundColor: "#FFF" },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "10%",
  },

  dropdown1BtnStyle: {
    width: 250,
    height: 40,
    backgroundColor: "#ebd7fe",
    marginVertical: 5,
    borderRadius: 10,
  },
  dropdown1BtnTxtStyle: { color: "gray", textAlign: "left", fontSize: 14, marginLeft: 2 },
  dropdown1DropdownStyle: { backgroundColor: "#ebd7fe" },
  dropdown1RowStyle: {
    backgroundColor: "#ebd7fe",
    borderBottomColor: "#ebd7fe",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left", fontSize: 14 },

  dropdown2BtnStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#444",
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2DropdownStyle: { backgroundColor: "#444" },
  dropdown2RowStyle: { backgroundColor: "#444", borderBottomColor: "#C5C5C5" },
  dropdown2RowTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },

  dropdown3BtnStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#FFF",
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#444",
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dropdown3BtnImage: { width: 45, height: 45, resizeMode: "cover" },
  dropdown3BtnTxt: {
    color: "#444",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    marginHorizontal: 10,
  },
  dropdown3DropdownStyle: { backgroundColor: "slategray" },
  dropdown3RowStyle: {
    backgroundColor: "slategray",
    borderBottomColor: "#444",
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dropdownRowImage: { width: 45, height: 45, resizeMode: "cover" },
  dropdown3RowTxt: {
    color: "#F1F1F1",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    marginHorizontal: 0,
  },

  dropdown4BtnStyle: {
    width: "50%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown4BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown4DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown4RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown4RowTxtStyle: { color: "#444", textAlign: "left" },
});

export default NewAdoption;