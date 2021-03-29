import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components";
import { RAISINBLACK, LIGHTGREY } from "../constants/palette";
import { Icon } from "react-native-elements";

export const SearchBar = (props) => (
  <ContainerView>
    <Icon
      style={{ paddingLeft: 10 }}
      type="font-awesome-5"
      name="search"
      color={LIGHTGREY}
      size={20}
    />
    <Input
      value={props.value}
      placeholder="Search products"
      onChangeText={props.onChangeText}
    />
  </ContainerView>
);

const ContainerView = styled.View`
  flex-direction: row;
  border-bottom-width: ${StyleSheet.hairlineWidth};
  border-bottom-color: ${RAISINBLACK};
  border-radius: 100px;
  margin-top: 10px;
  margin-right: 15px;
  margin-left: 15px;
  padding: 3px;
  align-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  flex: 1;
  padding-left: 10;
  font-family: "Montserrat";
  font-size: 18;
`;
