import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { STRIPE } from "../constants/stripeSettings";
import { stripeCheckoutRedirectHTML } from "../components/StripeCheckout";
import { HomePath, PurchasePath } from "../constants/path";

const PaymentScreen = (props) => {
  // Called everytime the URL stats to load in the webview
  onLoadStart = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;

    console.log(nativeEvent);

    if (nativeEvent.url === STRIPE.SUCCESS_URL) {
      props.navigation.navigate(HomePath);
    }
    if (nativeEvent.url === STRIPE.CANCELED_URL) {
      props.navigation.navigate(HomePath);
    }
    if (nativeEvent.url != "about:blank") {
      props.navigation.navigate(PurchasePath, { url: nativeEvent.url });
    }
  };

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: stripeCheckoutRedirectHTML("a@a.it") }}
      onLoadStart={onLoadStart}
    />
  );
};

export default PaymentScreen;
