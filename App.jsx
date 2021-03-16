import React, { useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { View, Image } from "react-native";
import { Navigator } from "./app/navigator";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Audio } from "expo-av";

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
  total: 0.0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existed_item = state.addedItems.find(
        (item) => action.payload.id === item.id
      );
      if (existed_item) {
        action.payload.quantity += 1;
        return {
          ...state,
          total: state.total + parseFloat(action.payload.price),
        };
      } else {
        action.payload.quantity = 1;
        const newTotal = state.total + parseFloat(action.payload.price);
        return {
          ...state,
          addedItems: [...state.addedItems, action.payload],
          total: newTotal,
        };
      }
    }
    case "ADD_QTY": {
      action.payload.quantity += 1;
      const newTotal = state.total + parseFloat(action.payload.price);
      return {
        ...state,
        total: newTotal,
      };
    }
    case "SUBTRACT_QTY": {
      if (action.payload.quantity > 1) {
        action.payload.quantity -= 1;
        const newTotal = state.total - parseFloat(action.payload.price);
        return {
          ...state,
          total: newTotal,
        };
      } else {
        return {
          ...state,
        };
      }
    }

    case "REMOVE_ITEM": {
      let new_items = state.addedItems.filter(
        (item) => action.payload.id !== item.id
      );
      //calculating the total
      let newTotal =
        state.total -
        parseFloat(action.payload.price) * action.payload.quantity;
      return {
        ...state,
        addedItems: new_items,
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

  const [sound, setSound] = useState();

  const startAudio = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./app/assets/intro.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    startAudio();
    setTimeout(() => {
      setIsDelayFinished(true);
    }, 1000);
  }, [loaded]);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  if (!sound) {
    return null;
  } else {
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
  }
};
