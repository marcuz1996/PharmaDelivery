import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import { RAISINBLACK } from "../constants/palette";

export const Typography = ({ variantName, color, children, style }) => (
  <Text style={{ ...styles[variantName], color, ...style }}>{children}</Text>
);

const styles = StyleSheet.create({
  body1: {
    fontFamily: "MontserratBold",
    fontSize: 30,
    lineHeight: 36,
    textAlign: "center",
  },
  body2: {
    fontFamily: "MontserratBold", 
    fontSize: 22, 
    lineHeight: 32,
    paddingLeft: 4,
    paddingTop: 1,
    fontWeight: Platform === "ios" ? "600" : "bold",
  },
  body3: {
    fontFamily: "Montserrat", 
    fontSize: 16, 
    lineHeight: 22,
    paddingLeft: 4,
    paddingTop: 1,
    fontWeight: Platform === "ios" ? "600" : "bold",
  },
  body4: {
    fontSize: 14,
    color: RAISINBLACK,
    fontFamily: "Montserrat",
    paddingLeft: 20
  },
  body5: {
    fontFamily: "Montserrat", 
    fontSize: 12, 
    lineHeight: 22,
    marginTop: 2,
  },
});