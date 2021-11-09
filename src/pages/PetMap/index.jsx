import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
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

  const handleRegionChanged = (region) => {
    setCurrentRegion(region);
  }

  return (
    <>
      <MapView style={{ flex: 1 }} onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion}>

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
          <MaterialCommunityIcons name="map-marker-radius" size={20} color="#FFF"/>
        </LoadButton>
      </SearchForm>
    </>
  );
}

export default PetMap;