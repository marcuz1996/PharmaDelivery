import React from "react";
import { TextInput } from "react-native";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LIGHTGREY } from "../constants/palette";

export const InputTextField = ({ iconName, iconType, iconSize, ...props }) => (
  <View style={styles.input}>
    <TextInput style={styles.textInput} {...props} />
    <Icon
      type={iconType}
      name={iconName}
      size={iconSize || 30}
      color={LIGHTGREY}
    />
  </View>
);

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(171, 180, 189, 0.65)",
    shadowColor: "rgba(171, 180, 189, 0.35)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 8,
    borderRadius: 15,
    backgroundColor: "white",
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    fontFamily: "Montserrat",
    fontSize: 15,
  },
});
