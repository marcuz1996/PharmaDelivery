import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { RAISINBLACK, WHITE } from "../constants/palette";
import { Typography } from "../components/Typography";

export const PharmacyComponent = (props) => (
  <TouchableOpacity style={{ marginBottom: 20 }} onPress={props.onPress}>
    <PharmacyImage source={props.source} style={props.imgStyleOverride}>
      <LinearGradient
        colors={["transparent", RAISINBLACK, RAISINBLACK]}
        locations={[0.5, 0.9, 1]}
        style={styles.containerProduct}
      ></LinearGradient>
    </PharmacyImage>
    <MainInfo style={props.mainInfoOverride}>
      <Typography variantName="body2" color="white">
        {props.name}
      </Typography>
      <Divider />
      <IconTextContainer>
        <Icon
          type="material-community"
          name="map-marker-outline"
          color={WHITE}
          size={20}
        />
        <Typography variantName="body3" color="white">
          {props.address}
        </Typography>
      </IconTextContainer>
      <IconTextContainer>
        <Icon
          type="material-community"
          name="clock-time-four-outline"
          color={WHITE}
          size={20}
        />
        <Typography variantName="body3" color="white">
          {props.open} - {props.close}
        </Typography>
        {!props.hideStock && (
          <Typography variantName="body3" color="white">
            | In stock: {props.stock}
          </Typography>
        )}
      </IconTextContainer>
    </MainInfo>
  </TouchableOpacity>
);

const PharmacyImage = styled.ImageBackground`
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
`;

const MainInfo = styled.View`
  padding: 0 5%;
  position: absolute;
  top: 50%;
`;

const IconTextContainer = styled.View`
  width: 100%;
  flex-direction: row;
`;

const Divider = styled.View`
  border-bottom-color: white;
  border-bottom-width: 2px;
  width: 150px;
  margin: 8px 0;
`;

const styles = StyleSheet.create({
  containerProduct: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
