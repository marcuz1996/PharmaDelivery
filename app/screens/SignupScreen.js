import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import {
  LIGHTGREY,
  SECONDARYCOLOR,
  OKICOLOR,
  WHITE,
  LINKCOLOR,
} from "../constants/palette";
import { TouchableOpacity } from "react-native-gesture-handler";
import { InputTextField } from "../components/InputTextField";
import { LogRegButton } from "../components/LogRegButton";
import * as firebase from "firebase";
import { LoginPath } from "../constants/path";
import { ErrorMessage } from "../components/ErrorMessage";

export const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [zip, setZip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isValidPass, setIsValidPass] = useState(true);
  const [isValidMail, setIsValidMail] = useState(true);
  const [isMatchingPass, setIsMatchingPass] = useState(true);
  const [isValidField, setIsValidField] = useState(true);

  const authenticate = () => {
    setIsMatchingPass(true);
    setIsValidMail(true);
    setIsValidPass(true);
    setIsValidField(true);
    const checkPass = passCheck();
    const checkFields = fieldsCheck();
    if (checkPass && checkFields) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(mail, pass)
        .then((response) => {
          const uid = response.user.uid;
          const data = {
            id: uid,
            mail: mail,
            name: name,
            surname: surname,
            address: address,
            houseNumber: houseNumber,
            zip: zip,
            phoneNumber: phoneNumber,
          };
          firebase
            .database()
            .ref("Users/" + response.user.uid)
            .set(data);
          showMessage({
            message: "Success!",
            description: "Registration made successfully",
            type: "success",
            icon: "success",
            duration: 2500,
          });
          navigation.navigate(LoginPath);
        })
        .catch((error) => {
          if (
            error.code === "auth/email-already-in-use" ||
            error.code === "auth/invalid-email"
          )
            setIsValidMail(false);
        });
    }
  };

  const passCheck = () => {
    if (pass.trim().length < 8 || !pass.match(/\d+/g)) {
      setIsValidPass(false);
      return false;
    }
    if (pass != confirmPass) {
      setIsMatchingPass(false);
      return false;
    }
    setIsValidPass(true);
    setIsMatchingPass(true);
    return true;
  };

  const fieldsCheck = () => {
    const mailValidator =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      name.length < 2 ||
      name.length > 20 ||
      surname.length < 2 ||
      surname.length > 20 ||
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
      setIsValidField(false);
      return false;
    } else {
      return true;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CREATE ACCOUNT</Text>
      {isValidField ? null : (
        <ErrorMessage
          style={{ paddingLeft: 14 }}
          text="Some fields were not filled in correctly or were empty! Please insert your correct data."
        />
      )}
      <InputTextField
        iconName="account-outline"
        iconType="material-community"
        placeholder="Name"
        onChangeText={(val) => setName(val)}
        keyboardType="email-address"
      />
      <InputTextField
        iconName="account-outline"
        iconType="material-community"
        placeholder="Surname"
        onChangeText={(val) => setSurname(val)}
        keyboardType="email-address"
      />
      <InputTextField
        iconName="map-marker-outline"
        iconType="material-community"
        placeholder="Address"
        onChangeText={(val) => setAddress(val)}
        keyboardType="email-address"
      />
      <InputTextField
        iconName="map-marker-outline"
        iconType="material-community"
        placeholder="House number"
        onChangeText={(val) => setHouseNumber(val)}
        keyboardType="numeric"
      />
      <InputTextField
        iconName="map-marker-outline"
        iconType="material-community"
        placeholder="ZIP code"
        onChangeText={(val) => setZip(val)}
        keyboardType="numeric"
      />
      <InputTextField
        iconName="phone-outline"
        iconType="material-community"
        placeholder="Phone number"
        onChangeText={(val) => setPhoneNumber(val)}
        keyboardType="numeric"
      />
      <InputTextField
        iconName="email-outline"
        iconType="material-community"
        placeholder="E-mail"
        onChangeText={(val) => setMail(val)}
        keyboardType="email-address"
      />
      <View>
        {isValidMail ? null : (
          <ErrorMessage text="That email address is invalid or already in use!" />
        )}
      </View>
      <InputTextField
        iconName="lock-outline"
        iconType="material-community"
        iconSize={30}
        placeholder="Password"
        onChangeText={(val) => setPass(val)}
        keyboardType="default"
        secureTextEntry={true}
      />
      <View>
        {isValidPass ? null : (
          <ErrorMessage
            text="Password must contains at least 8 characters and include both
                letters and numbers."
          />
        )}
      </View>
      <InputTextField
        iconName="lock-outline"
        iconType="material-community"
        iconSize={30}
        placeholder="Confirm Password"
        onChangeText={(val) => setConfirmPass(val)}
        keyboardType="default"
        secureTextEntry={true}
      />
      <View>
        {isMatchingPass ? null : (
          <ErrorMessage text="Password and confirm password does not match!" />
        )}
      </View>
      <LogRegButton text="SIGN UP" onPress={() => authenticate()} />
      <Text style={styles.text}>Have already an account? </Text>
      <TouchableOpacity>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate(LoginPath)}
        >
          Click here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: WHITE,
  },
  header: {
    flex: 1,
    paddingHorizontal: 30,
    height: 100,
    justifyContent: "center",
    backgroundColor: OKICOLOR,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    fontFamily: "MontserratBold",
    color: SECONDARYCOLOR,
    textAlign: "center",
    paddingBottom: 30,
  },
  text: {
    fontFamily: "Montserrat",
    fontSize: 14,
    color: LIGHTGREY,
    textAlign: "center",
    marginTop: 24,
  },
  link: {
    color: LINKCOLOR,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    textAlign: "center",
  },
});
