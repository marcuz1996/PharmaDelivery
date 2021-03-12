import React from "react";
import { ERRORCOLOR } from "../constants/palette";
import * as Animatable from "react-native-animatable";
import { StyleSheet, Text } from "react-native";

export const ErrorMessage = (props) => (
  <Animatable.View animation="fadeInLeft" duration={500}>
    <Text style={styles.errorText}>{props.text}</Text>
  </Animatable.View>
);
const styles = StyleSheet.create({
  errorText: {
    color: ERRORCOLOR,
    fontSize: 9,
    fontFamily: "Montserrat",
  },
});
