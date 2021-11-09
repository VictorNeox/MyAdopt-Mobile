import React from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Platform, Pressable } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';


// import { Container } from './styles';

const { width: screenWidth } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
  },
  item: {
    width: '100%',
    height: screenWidth - 20, //height will be 20 units less than screen width.
  },
    imageContainer: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: Platform.select({ ios: 0, android: 1 }), //handle rendering bug.
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  dotContainer: {
    backgroundColor: 'rgb(230,0,0)',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  inactiveDotStyle: {
    backgroundColor: 'rgb(255,230,230)',
  },
});

const CarouselItem = ({ item, index }, props) => {
  return (
    <SafeAreaView style={styles.item}>
      <ParallaxImage
       source={{ uri: item }}
       containerStyle={styles.imageContainer}
       style={styles.image}
       {...props}
      />
    </SafeAreaView>
  );
}


export default CarouselItem;