import React from "react";
import styled from "styled-components";
import { Typography } from "./Typography";
import { Dimensions, View, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
import { WHITE, RAISINBLACK } from "../constants/palette";

export const ProductAndButton = (props) => (
  <View style={{ height: height * 0.35 }}>
    <View style={styles.imageContainer}>
      <ProductImage source={props.source} />
    </View>
    <QuantityButtonView style={styles.ButtonShadows}>
      <TouchableOpacitySign
        style={{
          borderTopLeftRadius: 25,
          borderBottomLeftRadius: 25,
        }}
        onPress={props.onPressMinus}
      >
        <Typography variantName={"body1"}>-</Typography>
      </TouchableOpacitySign>
      <QuantityView>
        <Typography variantName={"body2Alternative"}>
          {props.productQty}
        </Typography>
      </QuantityView>
      <TouchableOpacitySign
        style={{
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
        }}
        onPress={props.onPressPlus}
      >
        <Typography variantName={"body1"}>+</Typography>
      </TouchableOpacitySign>
    </QuantityButtonView>
  </View>
);

const ProductImage = styled.Image`
  width: ${width};
  height: 100%;
`;

const QuantityButtonView = styled.View`
  position: absolute;
  bottom: -20px;
  width: ${width};
  height: 50px;
  justify-content: center;
  flex-direction: row;
`;

const TouchableOpacitySign = styled.TouchableOpacity`
  width: 50px;
  background-color: ${WHITE};
  align-items: center;
  justify-content: center;
`;

const QuantityView = styled.View`
  width: 50px;
  background-color: ${WHITE};
  align-items: center;
  justify-content: center;
  border-top-color: ${RAISINBLACK};
  border-bottom-color: ${RAISINBLACK};
`;

const styles = StyleSheet.create({
  imageContainer: {
    borderColor: "rgba(171, 180, 189, 0.65)",
    shadowColor: "rgba(171, 180, 189, 0.35)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  ButtonShadows: {
    borderColor: "rgba(171, 180, 189, 0.65)",
    shadowColor: "rgba(171, 180, 189, 0.35)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
});
