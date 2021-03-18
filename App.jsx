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

const initialState = {
  addedItems: [],
  totalProduct: 0,
  total: 0.0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const quantity = action.payload.quantity;
      const existed_item = state.addedItems.find(
        (item) => action.payload.product.id === item.id
      );
      const newTotalProduct = state.totalProduct + quantity;
      if (existed_item) {
        action.payload.product.quantity += quantity;
        return {
          ...state,
          totalProduct: newTotalProduct,
          total:
            state.total + parseFloat(action.payload.product.price) * quantity,
        };
      } else {
        action.payload.product.quantity = quantity;
        const newTotal =
          state.total + parseFloat(action.payload.product.price) * quantity;
        return {
          ...state,
          addedItems: [...state.addedItems, action.payload.product],
          totalProduct: newTotalProduct,
          total: newTotal,
        };
      }
    }
    case "ADD_QTY": {
      action.payload.quantity += 1;
      const newTotalProduct = state.totalProduct + 1;
      const newTotal = state.total + parseFloat(action.payload.price);
      return {
        ...state,
        totalProduct: newTotalProduct,
        total: newTotal,
      };
    }
    case "SUBTRACT_QTY": {
      if (action.payload.quantity > 1) {
        action.payload.quantity -= 1;
        const newTotalProduct = state.totalProduct - 1;
        const newTotal = state.total - parseFloat(action.payload.price);
        return {
          ...state,
          totalProduct: newTotalProduct,
          total: newTotal,
        };
      } else {
        return {
          ...state,
        };
      }
    }

    case "REMOVE_ITEM": {
      const new_items = state.addedItems.filter(
        (item) => action.payload.id !== item.id
      );
      const newTotalProduct = state.totalProduct - action.payload.quantity;
      const newTotal =
        state.total -
        parseFloat(action.payload.price) * action.payload.quantity;
      return {
        ...state,
        addedItems: new_items,
        totalProduct: newTotalProduct,
        total: newTotal,
      };
    }
  }
  return state;
};

const store = createStore(cartReducer);

export default () => {
  const [isDelayFinished, setIsDelayFinished] = useState(false);

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
        <Navigator />
      </Provider>
    );
  }
};
