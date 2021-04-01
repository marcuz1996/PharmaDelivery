import * as firebase from "firebase";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { LogRegButton } from "../components/LogRegButton";
import { ERRORCOLOR, LIGHTBLUE, OKICOLOR } from "../constants/palette";

function ShipmentStatusScreen(props) {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    await firebase
      .firestore()
      .collection("Purchases")
      .doc(firebase.auth().currentUser.email)
      .onSnapshot((documentSnapshot) => {
        setPayments(documentSnapshot.data().payments.reverse());
      });
  };
  const refreshPage = () => {
    //todo
  };

  return !payments.length ? null : (
    <View style={styles.container}>
      <LogRegButton text="REFRESH" onPress={() => refreshPage()} />
      {payments.map((element) => {
        return (
          <View key={element.time} style={styles.shipmentContainer}>
            <View style={styles.statusBar}>
              <Text style={styles.orderStatus}>
                {element.status === "OK"
                  ? "The order being processed"
                  : element.status === "SHIPPED"
                  ? "The order has been shipped"
                  : "The order has been delivered"}
              </Text>
            </View>
            <View style={styles.statusBar}>
              <ProgressBar
                progress={
                  element.status === "OK"
                    ? 0
                    : element.status === "SHIPPED"
                    ? 0.5
                    : 1
                }
                width={200}
                borderColor={element.status === "KO" ? ERRORCOLOR : OKICOLOR}
                color={element.status === "KO" ? ERRORCOLOR : LIGHTBLUE}
                height={10}
              />
            </View>

            <View style={{ flexDirection: "row", paddingBottom: 3 }}>
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
                Price:{" "}
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "normal",
                  }}
                >
                  {element.price}
                  {"€"}
                </Text>
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingBottom: 3 }}>
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

            <Text
              style={{
                fontFamily: "MontserratBold",
                paddingBottom: 3,
              }}
            >
              Date:{" "}
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "normal",
                }}
              >
                {element.time}
              </Text>
            </Text>

            <Text
              style={{
                fontFamily: "MontserratBold",
                paddingBottom: 3,
              }}
            >
              Purchased products:{" "}
            </Text>
            {element.products.map((prod) => {
              return (
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "normal",
                  }}
                >
                  {"◙ "}
                  {prod.name}
                  {"   x "}
                  {prod.quantity}
                </Text>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  shipmentContainer: {
    paddingVertical: 10,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 2,
  },
  orderStatus: {
    fontFamily: "MontserratBold",
    fontSize: 15,
  },
});

export default ShipmentStatusScreen;
