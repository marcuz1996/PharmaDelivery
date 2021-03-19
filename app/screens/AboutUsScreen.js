import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { DARKGREY, LIGHTGREY, OKICOLOR } from "../constants/palette";

export const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About us</Text>
      <Text style={styles.text}>
        Find the medicine you need, wherever you are! The first service in Italy
        that lets you know the availability of medicine in your vicinity!
      </Text>
      <Text style={styles.paragraph}>How do we work?</Text>
      <Text style={styles.text}>
        Can't you go to the pharmacy? We go there for you! We will purchase the
        products you need and deliver them to you in 1 hour or in the most
        convenient time slot for you. Just follow a few simple steps.
      </Text>
      <View style={styles.iconContainer}>
        <View style={{ flexDirection: "row" }}>
          <Icon
            type="material-community"
            name="map-marker"
            size={40}
            color={OKICOLOR}
          />
          <Text style={styles.caption}>Put your address</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon
            type="material-community"
            name="hospital-box"
            size={40}
            color={OKICOLOR}
          />
          <Text style={styles.caption}>Choose pharmacy</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon
            type="entypo"
            name="magnifying-glass"
            size={40}
            color={OKICOLOR}
          />
          <Text style={styles.caption}>Find product</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon
            type="material-community"
            name="handshake"
            size={40}
            color={OKICOLOR}
          />
          <Text style={styles.caption}>Receive medicines</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>Why choose us?</Text>
      <Text style={styles.text}>
        We are the leader in Italy for home delivery of medicines Every day
        thousands of people choose Pharmap to receive any pharmacy product at
        home. Here because:
      </Text>
      <View style={styles.iconContainer}>
        <View style={{ flexDirection: "row" }}>
          <Icon
            type="material-community"
            name="hospital-box"
            size={40}
            color={OKICOLOR}
          />
          <Text style={styles.caption}>We give priority to your privacy</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon
            type="material-community"
            name="cash-100"
            size={40}
            color={OKICOLOR}
          />
          <Text style={styles.caption}>The price is transparent</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>Contact us</Text>
      <Text style={styles.text}>
        in case of any problem please do not hesitate to contact us through our
        various communication channels
      </Text>
      <View style={styles.iconContainer}>
        <View style={{ flexDirection: "row" }}>
          <Icon
            type="material-community"
            name="email"
            size={40}
            color={OKICOLOR}
          />
          <Text style={styles.caption}>pharamdelivery@info.it</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon
            type="material-community"
            name="phone"
            size={40}
            color={OKICOLOR}
          />
          <Text style={styles.caption}>+39 0258933456</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon
            type="material-community"
            name="facebook"
            size={40}
            color={OKICOLOR}
          />
          <Text style={styles.caption}>Pharma Delivery Official</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon
            type="material-community"
            name="instagram"
            size={40}
            color={OKICOLOR}
          />
          <Text style={styles.caption}>PharmaDelivery</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  iconContainer: {
    padding: 15,
  },
  title: {
    fontFamily: "MontserratBold",
    fontSize: 30,
    textAlign: "center",
    paddingHorizontal: 3,
  },
  paragraph: {
    fontFamily: "MontserratBold",
    fontSize: 22,
    color: DARKGREY,
    marginTop: 13,
    marginBottom: 2,
    textAlign: "center",
  },
  text: {
    textAlign: "justify",
    fontFamily: "Montserrat",
    fontSize: 15,
  },
  caption: {
    fontFamily: "Montserrat",
    fontSize: 18,
    marginLeft: 20,
    marginTop: 10,
    textAlign: "left",
  },
});
