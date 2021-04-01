import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { STRIPE } from "../constants/stripeSettings";
import { HomePath } from "../constants/path";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { showMessage } from "react-native-flash-message";
import Header from "../components/Header";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  ActivityIndicator,
} from "react-native";
import { OKICOLOR, WHITE } from "../constants/palette";
import { stripeCheckoutRedirectHTML } from "../components/StripeCheckout";

const StripePurchaseScreen = (props) => {
  const { route } = props;
  const { shipmentDetail } = route.params;
  const [webviewRef, setWebviewRef] = useState();
  const [successfulPayment, setSuccessfulPayment] = useState(false);

  const updatePaymentList = (status) => {
    firebase
      .firestore()
      .collection("Purchases")
      .doc(firebase.auth().currentUser.email)
      .update({
        payments: firebase.firestore.FieldValue.arrayUnion({
          price: props.total.toString(),
          time: new Date().toUTCString().split(" GMT")[0],
          status: status,
          name: shipmentDetail.name,
          zip: shipmentDetail.zip,
          houseNumber: shipmentDetail.houseNumber,
          address: shipmentDetail.address,
          phoneNumber: shipmentDetail.phoneNumber,
          mail: shipmentDetail.mail,
          otherInfo: shipmentDetail.otherInfo,
          products: props.items,
        }),
      });
  };
  // Called everytime the URL stats to load in the webview
  const onLoadStart = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    //console.log(nativeEvent);
    if (nativeEvent.url === STRIPE.SUCCESS_URL) {
      showMessage({
        message: "Success!",
        description: "Payment made successfully",
        type: "success",
        icon: "success",
        duration: 2500,
      });
      setSuccessfulPayment(true);
      handleEmpty(props);
      updatePaymentList("OK");
      props.navigation.navigate(HomePath);
    }
    if (nativeEvent.url === STRIPE.CANCELED_URL) {
      setStatus("KO");
      showMessage({
        message: "Error!",
        description: "Payment error, order again",
        type: "danger",
        icon: "danger",
        duration: 2500,
      });
      updatePaymentList("KO");
      props.navigation.navigate(HomePath);
    }
  };

  const reloadPage = () => {
    setSuccessfulPayment(false);
    webviewRef.reload();
  };

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <Header comeback />
      <WebView
        ref={(WEBVIEW_REF) => {
          setWebviewRef(WEBVIEW_REF);
        }}
        originWhitelist={["*"]}
        source={{ html: stripeCheckoutRedirectHTML(shipmentDetail.mail) }}
        onLoadStart={onLoadStart}
        //onError={successfulPayment ? reloadPage() : console.log("ref doesn't exist")}
        //onHttpError={console.log("b")}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StripePurchaseScreen);
