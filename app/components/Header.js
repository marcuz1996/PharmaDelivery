import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import IconBadge from "react-native-icon-badge";
import { RAISINBLACK, WHITE, ERRORCOLOR } from "../constants/palette";
import { useNavigation } from "@react-navigation/native";
import { ShopCartPath } from "../constants/path";
import { useSelector } from "react-redux";

const Header = (props) => {
  const { totalQuantity } = useSelector((state) => ({
    totalQuantity: state.totalProduct,
  }));

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ ...styles.opacity, paddingLeft: 5 }}>
        <Icon
          style={styles.icon}
          type="font-awesome-5"
          name={props.comeback ? "angle-left" : "bars"}
          color={RAISINBLACK}
          size={props.comeback ? 40 : 30}
          onPress={() => {
            props.comeback ? navigation.goBack() : navigation.toggleDrawer();
          }}
        />
      </TouchableOpacity>

      <View style={styles.centralItem}>
        <Image source={require("../assets/logo2.png")} style={styles.logo} />
      </View>

      <TouchableOpacity style={{ ...styles.opacity, paddingRight: 5 }}>
        <IconBadge
          MainElement={
            <Icon
              style={styles.icon}
              type="font-awesome-5"
              name="shopping-cart"
              color={RAISINBLACK}
              size={30}
              onPress={() => {
                navigation.navigate(ShopCartPath);
              }}
            />
          }
          BadgeElement={
            totalQuantity === 0 ? null : (
              <Text style={styles.quantityText}>{totalQuantity}</Text>
            )
          }
          IconBadgeStyle={styles.badgeStyle}
          Hidden={totalQuantity === 0}
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
  quantityText: {
    color: WHITE,
  },
  badgeStyle: {
    width: 20,
    height: 20,
    backgroundColor: ERRORCOLOR,
    marginTop: -10,
  },
  centralItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
