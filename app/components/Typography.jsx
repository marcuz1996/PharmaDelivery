import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import { RAISINBLACK, WHITE } from "../constants/palette";

export const Typography = ({ variantName, color, children, style }) => (
  <Text style={{ ...styles[variantName], color, ...style }}>{children}</Text>
);

const styles = StyleSheet.create({
  hashtag: {
    fontWeight: Platform === "ios" ? "600" : "bold",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 2,
  },
  body1: {
    fontWeight: Platform === "ios" ? "600" : "bold",
    fontSize: 20,
    lineHeight: 23,
  },
  textLogo: {
    fontFamily: "bioliquid",
    fontSize: 20,
    lineHeight: 45,
  },
  body2: {
    fontWeight: Platform === "ios" ? "600" : "bold",
    fontSize: 15,
    lineHeight: 18,
  },
  PharmacyInfoText: {
    fontFamily: "Montserrat", 
    fontSize: 16, 
    lineHeight: 22,
    paddingLeft: 4,
    paddingTop: 1,
    fontWeight: Platform === "ios" ? "600" : "bold",
  },
  PharmacyInfoTitle: {
    fontFamily: "MontserratBold", 
    fontSize: 22, 
    lineHeight: 32,
    paddingLeft: 4,
    paddingTop: 1,
    fontWeight: Platform === "ios" ? "600" : "bold",
  },
  body4: {
    fontSize: 17,
    lineHeight: 16,
    fontWeight: Platform === "ios" ? "600" : "bold",
  },
  body5: {
    fontSize: 15,
    lineHeight: 18,
  },
});