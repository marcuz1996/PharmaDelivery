import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import styled from "styled-components";
import { FONTS } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { RAISINBLACK, WHITE } from "../constants/palette";

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
      <PharmacyText style={{ ...FONTS.h2 }}>{props.name}</PharmacyText>
      <Divider />
      <IconTextContainer>
        <Icon
          type="material-community"
          name="map-marker-outline"
          color={WHITE}
          size={20}
        />
        <PharmacyText style={{ ...FONTS.body3 }}>{props.address}</PharmacyText>
      </IconTextContainer>
      <IconTextContainer>
        <Icon
          type="material-community"
          name="clock-time-four-outline"
          color={WHITE}
          size={20}
        />
        <PharmacyText style={{ ...FONTS.body3 }}>
          {props.open} - {props.close}
        </PharmacyText>
        {!props.hideStock && (
          <PharmacyText style={{ ...FONTS.body3 }}>
            | In stock: {props.stock}
          </PharmacyText>
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
  top: 55%;
`;

const IconTextContainer = styled.View`
  width: 100%;
  flex-direction: row;
`;

const PharmacyText = styled.Text`
  color: white;
  padding-left: 4px;
  padding-top: 1px;
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
