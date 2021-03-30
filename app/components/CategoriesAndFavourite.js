import React from "react";
import styled from "styled-components";
import { Typography } from "./Typography";
import { ERRORCOLOR } from "../constants/palette";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export const CategoriesAndFavourite = (props) => (
  <View style={{ flexDirection: "row" }}>
    <CategoriesView>
      {props.categoriesIcons}
      {props.categoriesNames}
    </CategoriesView>
    <IconsAndTextView>
      {!props.saved.length ? (
        <>
          <Typography
            variantName="body3"
            style={{ width: "55%", marginTop: "7%" }}
          >
            Save element
          </Typography>
          <TouchableOpacity onPress={props.onPress}>
            <Icon
              style={styles.buttonProduct}
              type="material-community"
              name={"heart-outline"}
              color={ERRORCOLOR}
              size={32}
            />
          </TouchableOpacity>
        </>
      ) : props.saved.includes(props.id) ? (
        <>
          <Typography variantName="body3" style={styles.savedText}>
            Saved!
          </Typography>
          <TouchableOpacity onPress={props.onPress}>
            <Icon
              style={styles.buttonProduct}
              type="material-community"
              name={"heart"}
              color={ERRORCOLOR}
              size={32}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Typography
            variantName="body3"
            style={{ width: "55%", marginTop: "7%" }}
          >
            Save element
          </Typography>
          <TouchableOpacity onPress={props.onPress}>
            <Icon
              style={styles.buttonProduct}
              type="material-community"
              name={"heart-outline"}
              color={ERRORCOLOR}
              size={32}
            />
          </TouchableOpacity>
        </>
      )}
    </IconsAndTextView>
  </View>
);

const CategoriesView = styled.View`
  flex-direction: row;
  margin-top: 12px;
  width: 50%;
  margin-left: 50px;
`;

const IconsAndTextView = styled.View`
  flex-direction: row;
  width: 50%;
`;

const styles = StyleSheet.create({
  buttonProduct: {
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 5,
    flex: 1,
    left: 2,
  },
  savedText: {
    width: "50%",
    marginTop: "7%",
    color: "red",
    left: "80%",
  },
});
