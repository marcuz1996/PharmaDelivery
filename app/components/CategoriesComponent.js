import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { FONTS } from "../constants/theme";
import { Typography } from "./Typography";

export const CategoriesComponent = (props) => (
  <CategoryTouchableOpacity
    style={props.TouchableOpacityStyling}
    onPress={props.onPress}
  >
    <ImageContainer style={props.ImageContainerStyling}>
      <Image source={props.source} />
    </ImageContainer>
    <Typography variantName="CategoryName">{props.name}</Typography>
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
