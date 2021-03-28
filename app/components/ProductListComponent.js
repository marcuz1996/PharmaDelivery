import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import {
  RAISINBLACK,
  WHITE,
  LIGHTBLUE,
} from "../constants/palette";
import { Icon } from "react-native-elements";

export const ProductListComponent = (props) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={[WHITE, "#80F7FF", LIGHTBLUE]}
    locations={[0.3, 0.7, 1]}
    style={styles.containerProduct}
  >
    <TouchableOpacity onPress={props.onPressProduct}>
      <ProductImage source={props.source} />
    </TouchableOpacity>
    <TouchableOpacity onPress={props.onPressProduct}>
      <View style={{ justifyContent: "center" }}>
        <ProductText>Product: {props.name}</ProductText>
        <ProductText>Price: {props.price}€</ProductText>
        {props.map}
        {!props.hideStock && (
          <ProductText>Available quantity: {props.getStock}</ProductText>
        )}
      </View>
    </TouchableOpacity>
    <CartButtonView>
      <TouchableOpacity onPress={props.onPressCart}>
        <Icon
          style={styles.buttonProduct}
          type="material-community"
          name="cart-plus"
          color={RAISINBLACK}
          size={32}
        />
      </TouchableOpacity>
    </CartButtonView>
  </LinearGradient>
);

const ProductImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 30px;
  background-color: white;
`;

const ProductText = styled.Text`
  font-size: 14px;
  color: black;
  font-family: "Montserrat";
  padding-left: 20px;
`;

const CartButtonView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  position: absolute;
  right: 0;
`;

const styles = StyleSheet.create({
  containerProduct: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 30,
    marginBottom: 10,
    paddingRight: 130,
    alignItems: "center",
    height: 90,
  },
  buttonProduct: {
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    margin: 5,
    borderRadius: 50,
  },
});
