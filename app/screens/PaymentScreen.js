import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { InputTextField } from "../components/InputTextField";
import * as firebase from "firebase";
import { LogRegButton } from "../components/LogRegButton";
import { PaypalPurchasePath, StripePurchasePath } from "../constants/path";
import { OKICOLOR } from "../constants/palette";
import { ErrorMessage } from "../components/ErrorMessage";

const PaymentScreen = ({ navigation }) => {
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mail, setMail] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [isValidField, setIsValidField] = useState(true);
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    fieldsCheck();
  }, [name, zip, houseNumber, address, phoneNumber, mail]);

  const getInfo = async () => {
    await firebase
      .database()
      .ref("Users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        setUser(snapshot.val());
        setName(snapshot.val().name + " " + snapshot.val().surname);
        setZip(snapshot.val().zip);
        setHouseNumber(snapshot.val().houseNumber);
        setAddress(snapshot.val().address);
        setPhoneNumber(snapshot.val().phoneNumber);
        setMail(snapshot.val().mail);
      });
  };

  const fieldsCheck = () => {
    const mailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      name.length < 2 ||
      name.length > 30 ||
      !/^\d+$/.test(houseNumber) ||
      houseNumber.length < 1 ||
      houseNumber.length > 4 ||
      !/^\d+$/.test(zip) ||
      zip.length != 5 ||
      !/^\d+$/.test(phoneNumber) ||
      phoneNumber.length < 8 ||
      phoneNumber.length > 10 ||
      !mailValidator.test(mail.toLowerCase())
    ) {
      setIsDisabledButton(true);
      setIsValidField(false);
    } else {
      setIsDisabledButton(false);
      setIsValidField(true);
    }
  };

  return !user ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={OKICOLOR} />
    </View>
  ) : (
    <>
      <Text style={styles.title}>Shipment Details</Text>
      <View style={styles.container}>
        {isValidField ? null : (
          <View>
            <ErrorMessage text="Some fields were not filled in correctly or were empty!" />
          </View>
        )}
        <InputTextField
          placeholder="Name Surname"
          onChangeText={(val) => setName(val)}
          keyboardType="email-address"
          defaultValue={user.name + " " + user.surname}
        />
        <InputTextField
          placeholder="Address"
          onChangeText={(val) => setAddress(val)}
          keyboardType="email-address"
          defaultValue={user.address}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%" }}>
            <InputTextField
              placeholder="House number"
              onChangeText={(val) => setHouseNumber(val)}
              keyboardType="numeric"
              defaultValue={user.houseNumber}
            />
          </View>

          <View style={{ width: "50%" }}>
            <InputTextField
              placeholder="ZIP/CAP"
              onChangeText={(val) => setZip(val)}
              keyboardType="numeric"
              defaultValue={user.zip}
            />
          </View>
        </View>
        <InputTextField
          placeholder="Phone number"
          onChangeText={(val) => setPhoneNumber(val)}
          keyboardType="numeric"
          defaultValue={user.phoneNumber}
        />
        <InputTextField
          placeholder="Email"
          caretHidden
          onChangeText={(val) => setMail(val)}
          keyboardType="email-address"
          defaultValue={user.mail}
        />
        <InputTextField
          placeholder="Other info for rider"
          onChangeText={(val) => setOtherInfo(val)}
          keyboardType="visible-password"
        />
        <LogRegButton
          disabled={isDisabledButton}
          text="DEBIT/CREDIT CARD"
          onPress={() => {
            navigation.navigate(StripePurchasePath, {
              shipmentDetail: {
                name: name,
                zip: zip,
                houseNumber: houseNumber,
                address: address,
                phoneNumber: phoneNumber,
                mail: mail,
                otherInfo: otherInfo,
              },
            });
          }}
        />
        <LogRegButton
          disabled={isDisabledButton}
          text="PAYPAL"
          onPress={() => {
            navigation.navigate(PaypalPurchasePath, {
              shipmentDetail: {
                name: name,
                zip: zip,
                houseNumber: houseNumber,
                address: address,
                phoneNumber: phoneNumber,
                mail: mail,
                otherInfo: otherInfo,
              },
            });
          }}
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
