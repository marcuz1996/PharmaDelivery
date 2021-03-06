import React, { useState } from "react";
import * as firebase from "firebase";
import { ScrollView, Image, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { InputTextField } from "../components/InputTextField";
import { LogRegButton } from "../components/LogRegButton";
import { ErrorMessage } from "../components/ErrorMessage";
import {
  SECONDARYCOLOR,
  LINKCOLOR,
  LIGHTGREY,
  WHITE,
} from "../constants/palette";
import { ForgotPassPath, RegisterPath } from "../constants/path";

export const LoginScreen = ({ navigation, onLogin }) => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [isValidCredential, setIsValidCredential] = useState(true);

  const handleLogIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(mail, pass)
      .then(() => {
        onLogin();
      })
      .catch(() => {
        console.log("wrong login");
        setIsValidCredential(false);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View
          style={{
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Image
            source={require("../assets/logo2.png")}
            style={styles.logo}
          ></Image>
          <Text style={styles.textLogo}>PHARMA DELIVERY</Text>
        </View>

        <View style={{ paddingTop: 25 }}>
          <InputTextField
            iconName="email-outline"
            iconType="material-community"
            placeholder="E-mail"
            onChangeText={(val) => setMail(val)}
            keyboardType="email-address"
          />
          <InputTextField
            iconName="lock-outline"
            iconType="material-community"
            placeholder="Password"
            onChangeText={(val) => setPass(val)}
            keyboardType="default"
            secureTextEntry={true}
          />
          <View>
            {isValidCredential ? null : (
              <ErrorMessage text="Wrong credential!" />
            )}
          </View>

          <TouchableOpacity
            style={{ justifyContent: "center" }}
            activeOpacity={0}
          >
            <Text
              style={{
                ...styles.link,
                textAlign: "right",
                paddingTop: 20,
              }}
              onPress={() => navigation.navigate(ForgotPassPath)}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>

          <LogRegButton text="SIGN IN" onPress={() => handleLogIn()} />
          <Text style={styles.text}>Don't have an account? </Text>

          <LogRegButton
            text="SIGN UP"
            onPress={() => navigation.navigate(RegisterPath)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: WHITE,
  },
  link: {
    color: LINKCOLOR,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat",
  },
  textLogo: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: "500",
    fontFamily: "MontserratBold",
    color: SECONDARYCOLOR,
  },
  text: {
    fontSize: 14,
    color: LIGHTGREY,
    textAlign: "center",
    marginTop: 24,
    fontFamily: "Montserrat",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 200,
  },
});

/*  const GoogleSignIn = () => {
    signInWithGoogleAsync();
  };

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        expoClientId:
          "150453188768-6h59q3rlc0n9gjb584bneuhqmgl22nnq.apps.googleusercontent.com",
        androidClientId:
          "150453188768-lo8ua0mkt2qq5odj6ddfunosdgle9kmb.apps.googleusercontent.com",
        iosClientId:
          "150453188768-vpmi087oqm6ngr7a0i2jl1ubsrpje6d5.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }; */
