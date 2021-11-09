import React from 'react';
import { useState } from 'react';

import { Dimensions, View, Text } from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselItem from "../CarouselItem";
import { IndexIndicator } from './styles';

const { width } = Dimensions.get("window");


const CustomSlider = ({ data }) => {
  
  const [index, setIndex] = useState(1);

  const settings = {
    sliderWidth: width,
    sliderHeight: width,
    itemWidth: width - 20,
    data: data,
    renderItem: CarouselItem,
    hasParallaxImages: true,
    onSnapToItem: (imageIndex) => {
      setIndex(imageIndex + 1);
    }
  };

  return (
    <View style={{ marginTop: 12 }}>
      {data.length > 1 && (
       <IndexIndicator style={{ borderRadius: 100 }}>{index}/{data.length}</IndexIndicator>
      )}
       <Carousel {...settings} />
    </View>
  );
}

export default CustomSlider;