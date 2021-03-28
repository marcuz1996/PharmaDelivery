import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { FONTS } from "../constants/theme";


export const CategoriesComponent = (props) => (
  <CategoryTouchableOpacity
    style={props.TouchableOpacityStyling}
    onPress={props.onPress}
  >
    <ImageContainer style={props.ImageContainerStyling}>
      <Image source={props.source} />
    </ImageContainer>
    <Text
      style={{
        marginTop: 2,
        ...FONTS.body5,
      }}
    >
      {props.name}
    </Text>
  </CategoryTouchableOpacity>
);

const CategoryTouchableOpacity = styled.TouchableOpacity`
  padding: 10px;
  padding-bottom: 20px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 115px;
  height: 115px;
`;

const ImageContainer = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 50px;
  height: 50px;
`;
