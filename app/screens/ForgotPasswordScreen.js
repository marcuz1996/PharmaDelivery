import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { LogRegButton } from "../components/LogRegButton";
import { InputTextField } from "../components/InputTextField";
import { LoginPath } from "../constants/path";
import {
  WHITE,
  RAISINBLACK,
  SECONDARYCOLOR,
  LIGHTGREY,
  LINKCOLOR,
} from "../constants/palette";
import { ErrorMessage } from "../components/ErrorMessage";
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ForgotPasswordScreen = ({ navigation, display }) => {
  const [mail, setMail] = useState("");
  const [isValidMail, setIsValidMail] = useState(true);

  const handleForgot = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(mail)
      .then(() => {
        setIsValidMail(true);
        navigation.navigate(LoginPath);
      })
      .catch(() => {
        setIsValidMail(false);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>ACCESS PROBLEMS?</Text>
        <Text style={styles.text}>
          Insert your e-mail address and we will send you a link to recover your
          account.
        </Text>
        <InputTextField
          iconName="email-outline"
          iconType="material-community"
          iconSize={35}
          placeholder="Your e-mail address"
          onChangeText={(val) => setMail(val)}
          keyboardType="default"
        />
        {isValidMail ? null : (
          <ErrorMessage text="Please insert a valid e-mail!" />
        )}
        <LogRegButton text="Send Link" onPress={() => handleForgot()} />
      </View>
      {display && (
        <>
          <Text style={{ ...styles.text, color: LIGHTGREY }}>
            Come back to Sign in page?
          </Text>
          <TouchableOpacity>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate(LoginPath)}
            >
              Click here
            </Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: WHITE,
  },
  text: {
    fontSize: 14,
    color: RAISINBLACK,
    textAlign: "center",
    marginTop: 24,
    fontFamily: "Montserrat",
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    fontFamily: "MontserratBold",
    color: SECONDARYCOLOR,
    textAlign: "center",
  },
  link: {
    color: LINKCOLOR,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
    textAlign: "center",
  },
});
