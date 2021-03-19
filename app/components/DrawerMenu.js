import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Avatar, Title, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import * as firebase from "firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  HomePath,
  MapPath,
  ProfilePath,
  PharmaciesListPath,
  PrivacyPath,
  AboutUsPath,
} from "../constants/path";
import { OKICOLOR } from "../constants/palette";

export const DrawerMenu = (props) => {
  const paperTheme = useTheme();

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out!"));
    props.onLogout();
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 15 }}>
            <Avatar.Image source={require("../assets/logo2.png")} size={50} />
            <View style={{ marginLeft: 15, flexDirection: "column" }}>
              <Title style={styles.title}>PHARMA DELIVERY</Title>
            </View>
          </View>

          <Drawer.Section title="Menu" style={styles.drawerSection}>
            <DrawerItem
              icon={({ size }) => (
                <Icon name="home-outline" color={OKICOLOR} size={size} />
              )}
              label={HomePath}
              onPress={() => {
                props.navigation.navigate(HomePath);
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Icon name="account-outline" color={OKICOLOR} size={size} />
              )}
              label={ProfilePath}
              onPress={() => {
                props.navigation.navigate(ProfilePath);
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Icon name="map-marker-outline" color={OKICOLOR} size={size} />
              )}
              label={MapPath}
              onPress={() => {
                props.navigation.navigate(MapPath);
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Icon
                  name="hospital-box-outline"
                  color={OKICOLOR}
                  size={size}
                />
              )}
              label={PharmaciesListPath}
              onPress={() => {
                props.navigation.navigate(PharmaciesListPath);
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Icon
                  name="account-check-outline"
                  color={OKICOLOR}
                  size={size}
                />
              )}
              label="Support"
              //onPress={() => {props.navigation.navigate('SupportScreen')}}
            />
          </Drawer.Section>
          <Drawer.Section title="Information">
            <DrawerItem
              icon={({ size }) => (
                <Icon
                  name="shield-account-outline"
                  color={OKICOLOR}
                  size={size}
                />
              )}
              label={PrivacyPath}
              onPress={() => {
                props.navigation.navigate(PrivacyPath);
              }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Icon name="information-outline" color={OKICOLOR} size={size} />
              )}
              label={AboutUsPath}
              onPress={() => {
                props.navigation.navigate(AboutUsPath);
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ size }) => (
            <Icon name="exit-to-app" color={OKICOLOR} size={size} />
          )}
          label="Sign Out"
          onPress={() => logout()}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: "bold",
    fontFamily: "MontserratBold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
