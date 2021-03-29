import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

export const Typography = ({ variantName, color, children, style }) => (
  <Text style={{ ...styles[variantName], color, ...style }}>{children}</Text>
);

const styles = StyleSheet.create({
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
  CategoryName: {
    fontFamily: "Montserrat", 
    fontSize: 12, 
    lineHeight: 22,
    marginTop: 2,
  },
});