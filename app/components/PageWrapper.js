import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
} from "react-native";
import { WHITE } from "../constants/palette";
import Header from "../components/Header";

export const PageWrapper = ({
  children,
  hideHeader,
  isScrollView,
  comeback,
}) => (
  <SafeAreaView style={styles.androidSafeArea}>
    {!hideHeader && <Header comeback={comeback} />}
    {isScrollView ? <ScrollView>{children}</ScrollView> : <>{children}</>}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: WHITE,
    paddingTop: Platform.OS === "android" ? 5 : 0,
  },
});

//StatusBar.currentHeight
