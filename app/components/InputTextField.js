import React from "react";
import { render } from "react-dom";
import { TextInput } from "react-native";
import { Image, Text, View, StyleSheet } from "react-native";
import { LIGHTGREY, SECONDARYCOLOR } from "../constants/palette";

export const InputTextField = ({ text, caption, ...props }) => (
  <View>
    {text && <Text style={styles.text}>{text}</Text>}
    <TextInput style={styles.input} {...props} />
    {caption && <Text style={styles.caption}>{caption}</Text>}
  </View>
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: SECONDARYCOLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 8,
    borderRadius: 15,
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Montserrat",
    fontSize: 15,
  },
  caption: {
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat",
    fontSize: 12,
    color: LIGHTGREY,
  },
});

//riga nera orizzontale
/* <View
style={{
  borderBottomColor: "black",
  borderBottomWidth: 1,
}}
/> */
