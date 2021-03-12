import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { PageWrapper } from "../components/PageWrapper";
import { MAINCOLOR, SECONDARYCOLOR } from "../constants/palette";

export const ProvaScreen = () => (
  <PageWrapper>
    <View style={styles.view}>
      <Text style={styles.text}>PROVAAAAAAA</Text>
      <Image source={require("../assets/favicon.png")} />
    </View>
  </PageWrapper>
);
const styles = StyleSheet.create({
  text: {
    color: SECONDARYCOLOR,
  },
  view: {
    color: SECONDARYCOLOR,
    backgroundColor: MAINCOLOR,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
