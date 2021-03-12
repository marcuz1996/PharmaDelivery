import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
} from "react-native";
import { Header, Icon } from "react-native-elements";
import { MAINCOLOR, GREEN, OKICOLOR, WHITE } from "../constants/palette";

export const PageWrapper = ({ children }) => (
  <SafeAreaView style={styles.androidSafeArea}>
    <ScrollView>{children}</ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: WHITE,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
