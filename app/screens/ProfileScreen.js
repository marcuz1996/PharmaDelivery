import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as firebase from "firebase";
import { LogRegButton } from "../components/LogRegButton";
import {
  ERRORCOLOR,
  GREENBG,
  LIGHTGREY,
  OKICOLOR,
  RAISINBLACK,
  REDBG,
  WHITE,
} from "../constants/palette";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ForgotPassPath } from "../constants/path";
import { ErrorMessage } from "../components/ErrorMessage";

export const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [zip, setZip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mail, setMail] = useState("");
  const [changeSetting, setChangeSetting] = useState(false);
  const [payments, setPayments] = useState([]);
  const [isDBReady, setIsDBReady] = useState(false);
  const [modalVisible, setModalVisible] = useState([]);
  const [correctUpdate, setCorrectUpdate] = useState(true);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    await firebase
      .database()
      .ref("Users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        setUser(snapshot.val());
      });

    await firebase
      .firestore()
      .collection("Purchases")
      .doc(firebase.auth().currentUser.email)
      .onSnapshot((documentSnapshot) => {
        setPayments(documentSnapshot.data().payments.reverse());
        setModalVisible(documentSnapshot.data().payments.map(() => false));
      });
    setIsDBReady(true);
  };

  const changingSetting = () => {
    setName(user["name"]);
    setSurname(user["surname"]);
    setAddress(user["address"]);
    setHouseNumber(user["houseNumber"]);
    setZip(user["zip"]);
    setPhoneNumber(user["phoneNumber"]);
    setMail(user["mail"]);
    setChangeSetting(true);
  };

  const saveChanges = async () => {
    setCorrectUpdate(true);
    if (fieldsCheck()) {
      const tempUser = await firebase.auth().currentUser;
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
    }
  };

  const fieldsCheck = () => {
    const mailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
      setCorrectUpdate(false);
      return false;
    } else {
      return true;
    }
  };

  return !user || !isDBReady ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={OKICOLOR} />
    </View>
  ) : !changeSetting ? (
    <>
      <Text style={styles.title}>
        Hello {user.name} {user.surname}!
      </Text>
      <View style={styles.container}>
        <Text style={styles.paragraph}>Account</Text>

        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View style={{ width: "50%" }}>
            <Text style={styles.textDescriptor}>Name</Text>
            <Text style={styles.textInput}>{user.name}</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={styles.textDescriptor}>Surname</Text>
            <Text style={styles.textInput}>{user.surname}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View style={{ width: "50%" }}>
            <Text style={styles.textDescriptor}>Address</Text>
            <Text style={styles.textInput}>{user.address}</Text>
          </View>

          <View style={{ width: "50%" }}>
            <Text style={styles.textDescriptor}>House number</Text>
            <Text style={styles.textInput}>{user.houseNumber}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View style={{ width: "50%" }}>
            <Text style={styles.textDescriptor}>Zip code</Text>
            <Text style={styles.textInput}>{user.zip}</Text>
          </View>

          <View style={{ width: "50%" }}>
            <Text style={styles.textDescriptor}>Phone number</Text>
            <Text style={styles.textInput}>{user.phoneNumber}</Text>
          </View>
        </View>

        <Text style={styles.textDescriptor}>Email</Text>
        <Text style={styles.textInput}>{user.mail}</Text>

        <TouchableOpacity>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate(ForgotPassPath)}
          >
            Reset you password
          </Text>
        </TouchableOpacity>

        <LogRegButton
          text="Change your settings"
          onPress={() => changingSetting()}
        ></LogRegButton>

        <View
          style={{ flexDirection: "row", paddingTop: 20, paddingBottom: 10 }}
        >
          <Text style={{ ...styles.paragraph, marginTop: 8 }}>Payments</Text>
          <TouchableOpacity>
            <Icon
              style={{ marginTop: 8, marginLeft: 10 }}
              name="swap-vertical"
              color={LIGHTGREY}
              size={30}
              onPress={() => {
                setPayments((payments) => [...payments].reverse());
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          {payments.length
            ? payments.map((element, index) => {
                return (
                  <View key={element.time}>
                    <TouchableOpacity
                      onPress={() => {
                        if (modalVisible[index]) {
                          setModalVisible(modalVisible.map(() => false));
                        } else {
                          setModalVisible(
                            modalVisible.map(
                              (value, modalIndex) => modalIndex === index
                            )
                          );
                        }
                      }}
                    >
                      <View
                        style={{
                          ...styles.paymentsView,
                          backgroundColor:
                            element.status === "OK" ? GREENBG : REDBG,
                        }}
                      >
                        <Text style={{ ...styles.payments, marginLeft: 5 }}>
                          Date: {element.time}
                        </Text>
                        <Text
                          style={{
                            ...styles.payments,
                            marginLeft: 70,
                          }}
                        >
                          Price: {element.price}€
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {modalVisible[index] ? (
                      <Animatable.View animation="slideInDown" duration={500}>
                        <View
                          style={{ flexDirection: "row", paddingBottom: 3 }}
                        >
                          <Text
                            style={{
                              fontFamily: "MontserratBold",
                              width: "50%",
                            }}
                          >
                            Name:{" "}
                            <Text
                              style={{
                                fontFamily: "Montserrat",
                                fontWeight: "normal",
                              }}
                            >
                              {element.name}
                            </Text>
                          </Text>
                          <Text
                            style={{
                              fontFamily: "MontserratBold",
                              width: "50%",
                            }}
                          >
                            Phone:{" "}
                            <Text
                              style={{
                                fontFamily: "Montserrat",
                                fontWeight: "normal",
                              }}
                            >
                              {element.phoneNumber}
                            </Text>
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", paddingBottom: 3 }}
                        >
                          <Text
                            style={{
                              fontFamily: "MontserratBold",
                              width: "50%",
                            }}
                          >
                            Address:{" "}
                            <Text
                              style={{
                                fontFamily: "Montserrat",
                                fontWeight: "normal",
                              }}
                            >
                              {element.address}, {element.houseNumber}
                            </Text>
                          </Text>
                          <Text
                            style={{
                              fontFamily: "MontserratBold",
                              width: "50%",
                            }}
                          >
                            ZIP:{" "}
                            <Text
                              style={{
                                fontFamily: "Montserrat",
                                fontWeight: "normal",
                              }}
                            >
                              {element.zip}
                            </Text>
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontFamily: "MontserratBold",
                            paddingBottom: 3,
                          }}
                        >
                          Email:{" "}
                          <Text
                            style={{
                              fontFamily: "Montserrat",
                              fontWeight: "normal",
                            }}
                          >
                            {element.mail}
                          </Text>
                        </Text>
                        {element.otherInfo === "" ? null : (
                          <Text
                            style={{
                              fontFamily: "MontserratBold",
                              paddingBottom: 3,
                            }}
                          >
                            Other information:{" "}
                            <Text
                              style={{
                                fontFamily: "Montserrat",
                                fontWeight: "normal",
                              }}
                            >
                              {element.otherInfo}
                            </Text>
                          </Text>
                        )}
                      </Animatable.View>
                    ) : null}
                  </View>
                );
              })
            : null}
        </View>
      </View>
    </>
  ) : (
    <>
      <Text style={styles.title}>
        Hello {user.name} {user.surname}!
      </Text>
      <Text style={styles.text}>
        Edit your fields and finally click on save changes to update your
        profile. Remember that a correct data will help us to deliver your
        products right.
      </Text>
      {correctUpdate ? null : (
        <View style={{ paddingTop: 15, paddingRight: 15, paddingLeft: 15 }}>
          <ErrorMessage text="Some fields were not filled in correctly or were empty! Please insert your correct data. " />
        </View>
      )}
      <View style={styles.container}>
        <Text style={styles.textDescriptor}>Name</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={name}
          onChangeText={(val) => setName(val)}
          keyboardType="email-address"
        />

        <Text style={styles.textDescriptor}>Surname</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={surname}
          onChangeText={(val) => setSurname(val)}
          keyboardType="email-address"
        />

        <Text style={styles.textDescriptor}>Address</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={address}
          onChangeText={(val) => setAddress(val)}
          keyboardType="email-address"
        />
        <Text style={styles.textDescriptor}>House number</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={houseNumber}
          onChangeText={(val) => setHouseNumber(val)}
          keyboardType="numeric"
        />
        <Text style={styles.textDescriptor}>ZIP</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={zip}
          onChangeText={(val) => setZip(val)}
          keyboardType="numeric"
        />

        <Text style={styles.textDescriptor}>Phone number</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={phoneNumber}
          onChangeText={(val) => setPhoneNumber(val)}
          keyboardType="numeric"
        />

        <Text style={styles.textDescriptor}>Email</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={mail}
          onChangeText={(val) => setMail(val)}
          keyboardType="email-address"
        />
        <LogRegButton
          text="Save changes"
          onPress={() => saveChanges()}
        ></LogRegButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: RAISINBLACK,
    marginTop: 15,
    fontFamily: "Montserrat",
    paddingHorizontal: 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: WHITE,
    marginTop: 30,
  },
  textDescriptor: {
    fontFamily: "MontserratBold",
    fontSize: 16,
    color: LIGHTGREY,
  },

  textInput: {
    flex: 1,
    fontFamily: "Montserrat",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(171, 180, 189, 0.4)",
    marginBottom: 5,
  },
  title: {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontSize: 25,
    color: OKICOLOR,
    marginTop: 10,
  },
  paragraph: {
    marginBottom: 10,
    fontFamily: "MontserratBold",
    fontSize: 20,
    color: RAISINBLACK,
  },
  link: {
    color: ERRORCOLOR,
    fontSize: 14,
    fontFamily: "Montserrat",
    paddingTop: 20,
  },
  payments: {
    fontFamily: "Montserrat",
    flex: 1,
  },
  paymentsView: {
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
});
