import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isValidPass, setIsValidPass] = useState(true);
  const [isValidMail, setIsValidMail] = useState(true);
  const [isMatchingPass, setIsMatchingPass] = useState(true);

  const authenticate = () => {
    setIsMatchingPass(true);
    setIsValidMail(true);
    setIsValidPass(true);
    const check = passCheck();
    if (check) {
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
            phoneNumber: phoneNumber,
          };
          firebase
            .database()
            .ref("Users/" + response.user.uid)
            .set(data);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CREATE ACCOUNT</Text>
      <InputTextField
        iconName="account-outline"
        iconType="material-community"
        placeholder="Name"
        onChangeText={(val) => setName(val)}
        keyboardType="visible-password"
      />
      <InputTextField
        iconName="account-outline"
        iconType="material-community"
        placeholder="Surname"
        onChangeText={(val) => setSurname(val)}
        keyboardType="visible-password"
      />
      <InputTextField
        iconName="map-marker-outline"
        iconType="material-community"
        placeholder="Address"
        onChangeText={(val) => setAddress(val)}
        keyboardType="visible-password"
      />
      <InputTextField
        iconName="phone-outline"
        iconType="material-community"
        placeholder="Phone number"
        onChangeText={(val) => setPhoneNumber(val)}
        keyboardType="visible-password"
      />
      <InputTextField
        iconName="email-outline"
        iconType="material-community"
        placeholder="E-mail"
        onChangeText={(val) => setMail(val)}
        keyboardType="visible-password"
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
          <ErrorMessage text="password and confir password does not match!" />
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
