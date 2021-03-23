import React, { useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { View, Image, LogBox } from "react-native";
import { Navigator } from "./app/navigator";
import { Provider } from "react-redux";
import { createStore } from "redux";
import * as firebase from "firebase";
import {
  APIKEY,
  AUTHDOMAIN,
  DATABASEURL,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGESENDERID,
  APPID,
} from "./app/constants/config";
import { LIGHTBLUE } from "./app/constants/palette";
import { cartReducer } from "./app/redux/reducer";

LogBox.ignoreAllLogs(true);

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DATABASEURL,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGESENDERID,
  appId: APPID,
};

const store = createStore(cartReducer);

export default () => {
  const [isDelayFinished, setIsDelayFinished] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const [loaded] = useFonts({
    Montserrat: require("./app/assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("./app/assets/fonts/Montserrat-Bold.ttf"),
    Helvetica: require("./app/assets/fonts/Helvetica-Bold-Font.ttf"),
  });

  useEffect(() => {
    setTimeout(() => {
      setIsDelayFinished(true);
    }, 1000);
  }, [loaded]);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = (user) => {
    if (user) setIsAuth(true);
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  if (!isDelayFinished) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: LIGHTBLUE,
        }}
      >
        <Image
          source={require("./app/assets/logo.gif")}
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  } else {
    return (
      <Provider store={store}>
        <Navigator auth={isAuth} />
      </Provider>
    );
  }
};
