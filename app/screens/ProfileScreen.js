import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase";
import { LogRegButton } from "../components/LogRegButton";
import { SECONDARYCOLOR, WHITE } from "../constants/palette";
import { InputTextField } from "../components/InputTextField";

export const ProfileScreen = () => {
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mail, setMail] = useState("");
  const [changeSetting, setChangeSetting] = useState(false);

  const getInfo = async () => {
    firebase
      .database()
      .ref("Users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        setUser(snapshot.val());
      });
  };

  const changingSetting = () => {
    setName(user["name"]);
    setSurname(user["surname"]);
    setAddress(user["address"]);
    setPhoneNumber(user["phoneNumber"]);
    setMail(user["mail"]);
    setChangeSetting(true);
  };

  const saveChanges = () => {
    const tempUser = firebase.auth().currentUser;
    firebase
      .database()
      .ref("Users/" + tempUser.uid)
      .update({
        mail: mail,
        name: name,
        surname: surname,
        address: address,
        phoneNumber: phoneNumber,
      });
    tempUser.updateEmail(mail);
    setChangeSetting(false);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return !user ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#4335DB" />
    </View>
  ) : !changeSetting ? (
    <>
      <View style={styles.container}>
        <Text style={styles.textDescriptor}>Name</Text>
        <Text style={styles.text}>{user["name"]}</Text>
        <Text style={styles.textDescriptor}>Surname</Text>
        <Text style={styles.text}>{user["surname"]}</Text>
        <Text style={styles.textDescriptor}>Address</Text>
        <Text style={styles.text}>{user["address"]}</Text>
        <Text style={styles.textDescriptor}>Phone number</Text>
        <Text style={styles.text}>{user["phoneNumber"]}</Text>
        <Text style={styles.textDescriptor}>Email</Text>
        <Text style={styles.text}>{user["mail"]}</Text>
        <LogRegButton
          text="Change your settings"
          onPress={() => changingSetting()}
        ></LogRegButton>
      </View>
    </>
  ) : (
    <View style={styles.container}>
      <Text style={styles.textDescriptor}>Name</Text>
      <InputTextField
        style={styles.text}
        defaultValue={name}
        onChangeText={(val) => setName(val)}
        keyboardType="visible-password"
      ></InputTextField>

      <Text style={styles.textDescriptor}>Surname</Text>
      <InputTextField
        style={styles.text}
        defaultValue={surname}
        onChangeText={(val) => setSurname(val)}
        keyboardType="visible-password"
      ></InputTextField>

      <Text style={styles.textDescriptor}>Address</Text>
      <InputTextField
        style={styles.text}
        defaultValue={address}
        onChangeText={(val) => setAddress(val)}
        keyboardType="visible-password"
      ></InputTextField>

      <Text style={styles.textDescriptor}>Phone number</Text>
      <InputTextField
        style={styles.text}
        defaultValue={phoneNumber}
        onChangeText={(val) => setPhoneNumber(val)}
      ></InputTextField>

      <Text style={styles.textDescriptor}>Email</Text>
      <InputTextField
        style={styles.text}
        defaultValue={mail}
        onChangeText={(val) => setMail(val)}
        keyboardType="visible-password"
      ></InputTextField>
      <LogRegButton
        text="Save changes"
        onPress={() => saveChanges()}
      ></LogRegButton>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    borderWidth: 1,
    borderColor: SECONDARYCOLOR,
    padding: 8,
    margin: 8,
    borderRadius: 4,
    backgroundColor: "white",
    fontFamily: "Montserrat",
    fontSize: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: WHITE,
    marginTop: 30,
  },
  textDescriptor: {
    textAlign: "center",
    fontFamily: "MontserratBold",
    fontSize: 14,
  },
});
