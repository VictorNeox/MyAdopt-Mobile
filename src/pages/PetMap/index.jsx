import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  SearchForm,
  SearchInput,
  LoadButton,
} from './styles';

const PetMap = () => {
  const [currentRegion, setCurrentRegion] = useState(null);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestForegroundPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }

    loadInitialPosition();
  }, []);

  const [mockedData, setMockedData] = useState([
    {
      petId: 1,
      userName: 'Víctor Rodrigues',
      pet: 'cachorro',
      petName: 'Nick',
      gender: 'Macho',
      description: 'Dócil, amigável, brincalhão',
      age: 3,
      size: 'grande',
      address: {
        street: 'Luiz Antônio Bertáglia',
        city: 'Americana',
        uf: 'SP'
      },
      petImages: [
        'https://www.petz.com.br/cachorro/racas/husky-siberiano/img/husky-siberiano-caracteristicas-guia-racas.webp',
        'https://www.azpetshop.com.br/blog/wp-content/uploads/2020/12/husky-siberiano-raca.jpg',
        'https://www.infoescola.com/wp-content/uploads/2010/08/husky-siberiano_71212480.jpg'
      ],
      userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png',
      likes: 0,
      isLiked: false,
      latitude: -22.7105902,
      longitude: -47.3170858
    },
    {
      petId: 2,
      userName: 'Víctor Rodrigues',
      pet: 'cachorro',
      petName: 'Nick',
      gender: 'Macho',
      description: 'Dócil, amigável, brincalhão',
      age: 3,
      size: 'grande',
      address: {
        street: 'Luiz Antônio Bertáglia',
        city: 'Americana',
        uf: 'SP'
      },
      petImages: [
        'https://www.petlove.com.br/images/breeds/193223/profile/original/golden_retriever-p.jpg?1532539102',
        'https://www.azpetshop.com.br/blog/wp-content/uploads/2020/12/husky-siberiano-raca.jpg',
        'https://www.infoescola.com/wp-content/uploads/2010/08/husky-siberiano_71212480.jpg'
      ],
      userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png',
      likes: 0,
      isLiked: false,
      latitude: -22.7111918,
      longitude: -47.3169807
    },
    {
      petId: 3,
      userName: 'Víctor Rodrigues',
      pet: 'cachorro',
      petName: 'Buddy',
      gender: 'Femea',
      description: 'Dócil, amigável, brincalhão',
      age: 3,
      size: 'grande',
      address: {
        street: 'Luiz Antônio Bertáglia',
        city: 'Americana',
        uf: 'SP'
      },
      petImages: [
        'https://www.petz.com.br/cachorro/racas/samoieda/img/samoieda-caracteristicas-guia-racas.webp',
        'https://www.azpetshop.com.br/blog/wp-content/uploads/2020/12/husky-siberiano-raca.jpg',
        'https://www.infoescola.com/wp-content/uploads/2010/08/husky-siberiano_71212480.jpg'
      ],
      userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png',
      likes: 0,
      isLiked: false,
      latitude: -22.711310293556824,
      longitude: -47.31650895602984,
    },
  ]);

  const handleRegionChanged = (region) => {
    setCurrentRegion(region);
  }

  return (
    <>
      <MapView style={{ flex: 1 }} onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion}>
        {mockedData.map(pet => (
          <Marker key={pet.petId} coordinate={{ longitude: pet.longitude, latitude: pet.latitude }}>
            <Image style={styles.avatar} source={{ uri: pet.petImages[0] }} />
            <Callout onPress={() => {
              alert('foi')
            }} >
              <View style={styles.callout}>
                <Text style={styles.petName}>
                  {pet.petName} 
                  <MaterialCommunityIcons
                    name={pet.gender.toLocaleLowerCase() === 'macho' ? 'gender-male' : 'gender-female'}
                    size={16}
                    color={pet.gender.toLocaleLowerCase() === 'macho' ? '#00ADEF' : '#EA168F'}
                  />
                </Text>
                <Text style={styles.petTechs}>Porte {pet.size}</Text>
                <Text style={styles.petBio}>{pet.description}</Text>
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
        <LoadButton style={{ borderRadius: 25 }}>
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