import React from "react";
import styled from "styled-components";
import { Typography } from "./Typography";

export const ProductNameAndDescription = (props) => (
  <ContainerView>
    <Typography
      variantName={"body2"}
      style={{ marginVertical: 10, textAlign: "center" }}
    >
      {props.name} - {props.price}€
    </Typography>
    <Typography variantName={"body3"}>{props.description}</Typography>
  </ContainerView>
);

const ContainerView = styled.View`
  align-items: center;
  margin-top: 15px;
  padding-right: 20px;
  padding-left: 20px;
`;
