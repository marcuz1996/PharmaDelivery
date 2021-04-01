import React from "react";
import { View } from "react-native";
import ProgressBar from "react-native-progress/Bar";

function ShipmentStatusScreen(props) {
  return (
    <View>
      <ProgressBar progress={0.3} />
    </View>
  );
}

export default ShipmentStatusScreen;
