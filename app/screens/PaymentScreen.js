import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { InputTextField } from "../components/InputTextField";
import * as firebase from "firebase";
import { OKICOLOR } from "../constants/palette";
import { LogRegButton } from "../components/LogRegButton";
import { PurchasePath } from "../constants/path";

const PaymentScreen = ({ navigation }) => {
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mail, setMail] = useState("");

  /*   useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    await firebase
      .database()
      .ref("Users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        setUser(snapshot.val());
      });
  }; */

  return (
    <>
      <Text style={styles.title}>Payment Details</Text>
      <View style={styles.container}>
        <InputTextField
          placeholder="Name Surname"
          onChangeText={(val) => setName(val)}
          keyboardType="visible-password"
        />
        <InputTextField
          placeholder="Address"
          onChangeText={(val) => setAddress(val)}
          keyboardType="visible-password"
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%" }}>
            <InputTextField
              placeholder="House number"
              onChangeText={(val) => setAddress(val)}
              keyboardType="visible-password"
            />
          </View>

          <View style={{ width: "50%" }}>
            <InputTextField
              placeholder="ZIP/CAP"
              onChangeText={(val) => setAddress(val)}
              keyboardType="visible-password"
            />
          </View>
        </View>
        <InputTextField
          placeholder="Phone number"
          onChangeText={(val) => setPhoneNumber(val)}
          keyboardType="visible-password"
        />
        <InputTextField
          placeholder="Email"
          onChangeText={(val) => setMail(val)}
          keyboardType="visible-password"
        />
        <InputTextField
          placeholder="Other info for rider"
          onChangeText={(val) => setMail(val)}
          keyboardType="visible-password"
        />
        <LogRegButton
          text="PROCEED TO PAYMENT"
          onPress={() => navigation.navigate(PurchasePath)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  title: {
    fontFamily: "MontserratBold",
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 3,
  },
});
export default PaymentScreen;
