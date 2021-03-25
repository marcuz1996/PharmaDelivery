import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

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
  body3: {
    fontSize: 13,
    lineHeight: 16,
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