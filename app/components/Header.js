import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { LIGHTGREY, RAISINBLACK, OKICOLOR, WHITE } from "../constants/palette";
import { useNavigation } from "@react-navigation/native";

export const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ ...styles.opacity, paddingLeft: 5 }}>
        <Icon
          style={styles.icon}
          type="font-awesome-5"
          name="bars"
          color={OKICOLOR}
          size={30}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={require("../assets/logo2.png")} style={styles.logo} />
      </View>

      <TouchableOpacity style={{ ...styles.opacity, paddingRight: 5 }}>
        <Icon
          style={styles.icon}
          type="font-awesome-5"
          name="shopping-cart"
          color={OKICOLOR}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    backgroundColor: WHITE,
    borderBottomColor: RAISINBLACK,
    borderBottomWidth: 1,
  },
  icon: {
    //width: 40,
    height: 30,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  opacity: {
    width: 60,
    justifyContent: "center",
  },
});
