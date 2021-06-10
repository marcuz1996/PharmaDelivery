import React from "react";
import styled from "styled-components";
import { WHITE, RAISINBLACK } from "../constants/palette";
import { Typography } from "./Typography";
import { Icon } from "react-native-elements";
import { Modal, TouchableOpacity, StyleSheet } from "react-native";
import { LogRegButton } from "../components/LogRegButton";

export const AndroidMapModalComponent = (props) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={props.visible}
    key={props.key}
  >
    <TouchableOpacity
      style={styles.centeredView}
      activeOpacity={1}
      onPressOut={props.onPressOut}
    >
      <ExternalView>
        <InternalView>
          <PharmacyImage source={props.source} />
          <Typography variantName="body2" style={{ alignSelf: "center" }}>
            {props.name}
          </Typography>
          <InfoContainerView>
            <IconAndTextView>
              <Icon
                type="material-community"
                name="map-marker-outline"
                color={RAISINBLACK}
                size={20}
              />
              <Typography variantName="body3">{props.address}</Typography>
            </IconAndTextView>
            <IconAndTextView>
              <Icon
                type="material-community"
                name="clock-time-four-outline"
                color={RAISINBLACK}
                size={20}
              />
              <Typography variantName="body3">
                {props.open} - {props.close}
              </Typography>
            </IconAndTextView>
          </InfoContainerView>
          <LogRegButton text="Go To Pharmacy Page" onPress={props.onPress} />
        </InternalView>
      </ExternalView>
    </TouchableOpacity>
  </Modal>
);

const ExternalView = styled.View`
  flex: 0.5;
  background-color: ${WHITE};
  border-radius: 10px;
  justify-content: center;
  width: 100%;
  align-self: center;
  bottom: -90;
`;

const InternalView = styled.View`
  align-content: center;
  border-radius: 6px;
  padding: 5px;
  width: 100%;
  height: 60%;
  align-self: center;
  position: absolute;
  top: 0;
`;

const PharmacyImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const InfoContainerView = styled.View`
  flex-direction: row;
  padding-top: 10px;
  padding-left: 30px;
`;

const IconAndTextView = styled.View`
  width: 50%;
  flex-direction: row;
`;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1.0,
    justifyContent: "flex-end",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    bottom: 80,
  },
});
