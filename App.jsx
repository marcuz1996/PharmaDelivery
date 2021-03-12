import React, { useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { ActivityIndicator, View, Image } from "react-native";
import { Navigator } from "./app/navigator";
import { HomeScreen } from "./app/screens/HomeScreen";
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

export default () => {
  const [isDelayFinished, setIsDelayFinished] = useState(false);

  const [loaded] = useFonts({
    Montserrat: require("./app/assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("./app/assets/fonts/Montserrat-Bold.ttf"),
    Helvetica: require("./app/assets/fonts/Helvetica-Bold-Font.ttf"),
  });

  const [sound, setSound] = useState();

  async function startAudio() {
    const { sound } = await Audio.Sound.createAsync(
      require("./app/assets/intro.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    startAudio();
    setTimeout(() => {
      setIsDelayFinished(true);
    }, 5000);
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
          {/*         <ActivityIndicator size="large" color="#4335DB" />
           */}
          <Image
            source={require("./app/assets/logo.gif")}
            style={{ width: 300, height: 300 }}
          />
        </View>
      );
    } else {
      return <Navigator />;
    }
  }
};
