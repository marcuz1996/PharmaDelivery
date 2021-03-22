import React from "react";
import { WebView } from "react-native-webview";
import { STRIPE } from "../constants/stripeSettings";
import { HomePath } from "../constants/path";
import { connect } from "react-redux";
import Header from "../components/Header";
import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import { WHITE } from "../constants/palette";
import { stripeCheckoutRedirectHTML } from "../components/StripeCheckout";

const PurchaseScreen = (props) => {
  //const { route } = props;
  //const { params } = route.params;
  // Called everytime the URL stats to load in the webview
  onLoadStart = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;

    console.log(nativeEvent);

    if (nativeEvent.url === STRIPE.SUCCESS_URL) {
      //mettere notifica pagamento ok
      handleEmpty(props);
      props.navigation.navigate(HomePath);
    }
    if (nativeEvent.url === STRIPE.CANCELED_URL) {
      //mettere notifica pagamento ko
      props.navigation.navigate(HomePath);
    }
  };

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <Header />
      <WebView
        originWhitelist={["*"]}
        source={{ html: stripeCheckoutRedirectHTML("a@a.it") }}
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

export default connect(null, mapDispatchToProps)(PurchaseScreen);
