import React from "react";
import styled from "styled-components";
import { OKICOLOR} from "../constants/palette";

export const MarkerPinComponent = (props) => (
  <ExternalMarkerView>
    <InternalMarkerView>
      <PinImage source={props.icon} style={props.tintColor} />
    </InternalMarkerView>
  </ExternalMarkerView>
);

const ExternalMarkerView = styled.View`
  height: 60px;
  width: 50px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const InternalMarkerView = styled.View`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${OKICOLOR};
`;

const PinImage = styled.Image`
  width: 25px;
  height: 25px;
`;
