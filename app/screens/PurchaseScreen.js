import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { STRIPE } from "../constants/stripeSettings";
import { HomePath } from "../constants/path";
import { connect } from "react-redux";
import * as firebase from "firebase";
import Header from "../components/Header";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  ActivityIndicator,
} from "react-native";
import { WHITE } from "../constants/palette";
import { stripeCheckoutRedirectHTML } from "../components/StripeCheckout";

const PurchaseScreen = (props) => {
  const [user, setUser] = useState();

  useEffect(() => setupDB(), []);

  const setupDB = () => {
    firebase
      .database()
      .ref("Users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        setUser(snapshot.val());
      });
  };

  const updatePaymentList = (status) => {
    firebase
      .firestore()
      .collection("Purchases")
      .doc(firebase.auth().currentUser.email)
      .update({
        payments: firebase.firestore.FieldValue.arrayUnion({
          price: props.total.toString(),
          time: new Date().toLocaleString(),
          status: status,
        }),
      });
  };

  // Called everytime the URL stats to load in the webview
  const onLoadStart = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;

    //console.log(nativeEvent);

    if (nativeEvent.url === STRIPE.SUCCESS_URL) {
      //mettere notifica pagamento ok
      handleEmpty(props);
      //setUser(null);
      updatePaymentList("OK");
      props.navigation.navigate(HomePath);
    }
    if (nativeEvent.url === STRIPE.CANCELED_URL) {
      //mettere notifica pagamento ko
      updatePaymentList("KO");
      props.navigation.navigate(HomePath);
    }
  };

  return !user ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#4335DB" />
    </View>
  ) : (
    <SafeAreaView style={styles.androidSafeArea}>
      <Header />
      <WebView
        originWhitelist={["*"]}
        source={{ html: stripeCheckoutRedirectHTML(user.mail) }}
        onLoadStart={onLoadStart}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: WHITE,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    total: state.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    emptyCart: () => {
      dispatch({ type: "EMPTY_CART" });
    },
  };
};

const handleEmpty = (props) => {
  props.emptyCart();
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseScreen);

/*
const updatePaymentList = () => {
    firebase
      .firestore()
      .collection("Purchases")
      .doc(firebase.auth().currentUser.email)
      .update({
        price: firebase.firestore.FieldValue.arrayUnion(props.total),
        time: firebase.firestore.FieldValue.arrayUnion(
          new Date().toLocaleString()
        ),
      });
  };
  */
