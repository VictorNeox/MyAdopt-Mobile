import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  SearchForm,
  SearchInput,
  LoadButton,
} from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useCallback } from 'react';

import translatePetSize from '../../utils/translatePetSize';

const PetMap = () => {
  const [currentRegion, setCurrentRegion] = useState(null);

  const [searchText, setSearchText] = useState('');

  const [pets, setPets] = useState([]);

  const navigation = useNavigation();
  async function loadInitialPosition() {
      const { granted } = await requestForegroundPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        let { latitude, longitude } = coords;

        if (latitude === 37.4219807 && longitude === -122.0840163) {
          latitude = -22.711310293556824;
          longitude = -47.31650895602984;
        }

        console.log(latitude, longitude)

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }

  useFocusEffect(
    useCallback(() => {
      loadInitialPosition();
    }, [])
  );

  useEffect(() => {
    if (!currentRegion) return;
    handleGetPetsInRegion(currentRegion.latitude, currentRegion.longitude);
  }, [currentRegion]);

  const handleGetPetsInRegion = async (latitude, longitude) => {
    try {
      const { data } = await api.get(`/pet/post/findPostsInPositionRadius?latitude=${latitude}&longitude=${longitude}&distance=10`);
      setPets([...data]);
    } catch (err) {
      Alert.alert('Erro', 'Erro na busca de animais próximos.');
    }
  }

  const handleRegionChanged = (region) => {
    setCurrentRegion(region);
  }

  const navigateToPetDetail = (data) => {
    data.veterinaryCare = [
      'Vacinação',
      'Castração',
      'Vermifugação'
    ];
    navigation.navigate('petDetail', { petId: data });
  }

  return (
    <>
        <MapView 
          style={{ flex: 1 }} 
          onRegionChangeComplete={handleRegionChanged} 
          initialRegion={currentRegion}
          initialCamera={{ 
            pitch: 45,
            heading: 90,
            altitude: 20,
            zoom: 2
          }}
        >
          {pets.map((post, index) => (
              <Marker key={index} coordinate={{ longitude: post.longitude, latitude: post.latitude }}>
                <Image style={styles.avatar} source={{ uri: `http://192.168.50.126:8080/${post.image}` }} />
                <Callout onPress={() => {
                  navigateToPetDetail(post.id);
                }} >
                  <View style={styles.callout}>
                    <Text style={styles.petName}>
                      {post.name}
                      <MaterialCommunityIcons
                        name={post.gender && post.gender.toLocaleLowerCase() === 'm' ? 'gender-male' : 'gender-female'}
                        size={16}
                        color={post.gender && post.gender.toLocaleLowerCase() === 'm' ? '#00ADEF' : '#EA168F'}
                      />
                    </Text>
                    <Text style={styles.petTechs}>Porte {translatePetSize(post.size)}</Text>
                    <Text style={styles.petBio}>{post.description}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
        </MapView>
      <SearchForm>
        <SearchInput
          placeholder="Buscar animais para adoção..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={searchText}
          onChangeText={setSearchText}
        />
        <LoadButton onPress={() => console.log(pets)} style={{ borderRadius: 25 }}>
          <MaterialCommunityIcons name="map-marker-radius" size={20} color="#FFF" />
        </LoadButton>
      </SearchForm>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#FFF'
  },

  callout: {
    width: 260,
  },

  petName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  petBio: {
    color: '#666',
    marginTop: 5,
  },

  petTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    display: 'flex',
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 4,
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
})

export default PetMap;