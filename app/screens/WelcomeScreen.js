import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { LIGHTBLUE, WHITE } from "../constants/palette";

export const WelcomeScreen = ({ onFinish }) => {
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Image style={styles.image} source={item.image} resizeMode={"contain"} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const onDone = () => {
    onFinish();
  };

  return (
    <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone} />
  );
};

const slides = [
  {
    key: "s1",
    title: "LET'S START",
    text: "Do you need medicines?\n Did your doctor write you a medical prescription?",
    image: require("../assets/medicine2.png"),
  },
  {
    key: "s2",
    title: "ORDER MEDICINE ONLINE",
    text: "Choose your medicine from your favourite drugstore",
    image: require("../assets/select2.png"),
  },
  {
    key: "s3",
    title: "ONLINE PAYMENTS",
    text: "Once you choose your medicine,\ncomplete your payments through the app",
    image: require("../assets/mobile_pay2.png"),
  },
  {
    key: "s4",
    title: "DELIVERY",
    text: "In a short time you will receive your purchases at home",
    image: require("../assets/package_arrived2.png"),
  },
];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: LIGHTBLUE,
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
    borderRadius: 30,
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    color: WHITE,
    textAlign: "center",
  },
});
