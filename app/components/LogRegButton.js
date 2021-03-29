import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  LOCKBUTTONCOLOR,
  LIGHTGREY,
  OKICOLOR,
  WHITE,
} from "../constants/palette";

export const LogRegButton = (props) => (
  <TouchableOpacity
    style={{
      ...styles.submitContainer,
      backgroundColor: props.disabled === true ? LOCKBUTTONCOLOR : OKICOLOR,
    }}
    onPress={props.disabled ? null : props.onPress}
  >
    <Text style={{ ...styles.text, color: props.disabled ? LIGHTGREY : WHITE }}>
      {props.text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  submitContainer: {
    fontSize: 16,
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF",
    shadowColor: "rgba(255, 22, 84, 0.24)",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    width: "100%",
  },
  text: {
    fontFamily: "Montserrat",
    fontWeight: "600",
    fontSize: 16,
  },
});
