import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
} from "react-native";
import { MAINCOLOR, GREEN, OKICOLOR, WHITE } from "../constants/palette";
import Header from "../components/Header";

export const PageWrapper = ({ children, hideHeader }) => (
  <SafeAreaView style={styles.androidSafeArea}>
    {!hideHeader && <Header />}
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
