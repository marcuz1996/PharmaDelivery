import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import qs from "qs";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { OKICOLOR } from "../constants/palette";
import { HomePath } from "../constants/path";

const PaypalPurchaseScreen = (props) => {
  const [isWebViewLoading, SetIsWebViewLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");

  //When loading paypal page it refirects lots of times. This prop to control start loading only first time
  const [shouldShowWebViewLoading, setShouldShowWebviewLoading] = useState(
    true
  );

  useEffect(() => {
    buyBook();
  }, []);

  /*---Paypal checkout section---*/
  const buyBook = async () => {
    //Check out https://developer.paypal.com/docs/integration/direct/payments/paypal-payments/# for more detail paypal checkout
    const dataDetail = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      transactions: [
        {
          amount: {
            currency: "USD",
            total: props.total,
            details: {
              shipping: "0",
              subtotal: props.total,
              shipping_discount: "0",
              insurance: "0",
              handling_fee: "0",
              tax: "0",
            },
          },
          description: "This is the payment transaction description",
          payment_options: {
            allowed_payment_method: "IMMEDIATE_PAY",
          },
          item_list: {
            items: [
              {
                name: "Book",
                description: "Chasing After The Wind",
                quantity: "1",
                price: props.total,
                tax: "0",
                sku: "product34",
                currency: "USD",
              },
            ],
          },
        },
      ],
      redirect_urls: {
        return_url: "https://blank.org/", //"https://blank.org/",
        cancel_url: "https://yahoo.com/",
      },
    };

    const url = `https://api.sandbox.paypal.com/v1/oauth2/token`;

    const data = {
      grant_type: "client_credentials",
    };

    const auth = {
      username:
        "AYO7KtHTAB9YvntnkMu99JmeYkuTki-Io7PMVrlFC_yyjV_eBaSz5Cf8Dt2hagLdejagIoTlAkkgtswj", //"your_paypal-app-client-ID",  ARMxd34qENB4h2p6ZzCg_AakCSKW4xraPASHMrfqVuZn1G4hWZDfke4b8REWCg8Tx1sq-8dmWNnjOG2f
      password:
        "EMuDeaqVK5zsnI2JT0VBvqUBsa_wMVfSt7TjkLpj0kEj_QOVyospmQ9jZHXOudN-IO7JUjs-F3UiXB5e", //"your-paypal-app-secret-ID,  EH_O7KfgFfmUMMa71VMbLAqi4uQ-aqzpB2WEEqvqf0q6Mn60gTT9SQ1oP8J-w3tMER-hYdSL6M6vcEBG
    };

    const options = {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Credentials": true,
      },

      //Make sure you use the qs.stringify for data
      data: qs.stringify(data),
      auth: auth,
      url,
    };

    // Authorise with seller app information (clientId and secret key)
    axios(options)
      .then((response) => {
        setAccessToken(response.data.access_token);

        //Resquest payal payment (It will load login page payment detail on the way)
        axios
          .post(
            `https://api.sandbox.paypal.com/v1/payments/payment`,
            dataDetail,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${response.data.access_token}`,
              },
            }
          )
          .then((response) => {
            const { id, links } = response.data;
            const approvalUrl = links.find((data) => data.rel == "approval_url")
              .href;

            //console.log("response", links);
            setPaypalUrl(approvalUrl);
          })
          .catch((err) => {
            //console.log({ ...err });
          });
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  /*---End Paypal checkout section---*/

  const onWebviewLoadStart = () => {
    if (shouldShowWebViewLoading) {
      SetIsWebViewLoading(true);
    }
  };

  const _onNavigationStateChange = (webViewState) => {
    console.log("webViewState", webViewState);

    //When the webViewState.title is empty this mean it's in process loading the first paypal page so there is no paypal's loading icon
    //We show our loading icon then. After that we don't want to show our icon we need to set setShouldShowWebviewLoading to limit it
    if (webViewState.title == "") {
      //When the webview get here Don't need our loading anymore because there is one from paypal
      setShouldShowWebviewLoading(false);
    }

    if (webViewState.url.includes("https://blank.org/")) {
      setPaypalUrl(null);
      const urlArr = webViewState.url.split(/(=|&)/);

      const paymentId = urlArr[2];
      const payerId = urlArr[10];

      axios
        .post(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
          { payer_id: payerId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setShouldShowWebviewLoading(true);
          console.log(response.status);
          if (response.status === 200) {
            handleEmpty(props);
            updatePaymentList("OK");
            props.navigation.navigate(HomePath);
          }
          return;
        })
        .catch((err) => {
          setShouldShowWebviewLoading(true);
          updatePaymentList("KO");
          //console.log({ ...err });
        });
    }
  };

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
        }),
      });
  };

  return (
    <>
      {paypalUrl ? (
        <View style={styles.webview}>
          <WebView
            style={{ height: "100%", width: "100%", flex: 1 }}
            source={{ uri: paypalUrl }}
            onNavigationStateChange={_onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            onLoadStart={onWebviewLoadStart}
            onLoadEnd={() => SetIsWebViewLoading(false)}
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={OKICOLOR} />
        </View>
      )}
      {isWebViewLoading ? (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <ActivityIndicator size="large" color={OKICOLOR} />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  webview: {
    width: "100%",
    height: "100%",
    position: "absolute",
    marginTop: StatusBar.currentHeight,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#61E786",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
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
)(PaypalPurchaseScreen);
