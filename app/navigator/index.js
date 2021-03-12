import React, { useState } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { WelcomeScreen } from "../screens/WelcomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { SignupScreen } from "../screens/SignupScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { MapScreen } from "../screens/MapScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SettingScreen } from "../screens/SettingScreen";
import { ShopScreen } from "../screens/ShopScreen";
import { ForgotPasswordScreen } from "../screens/ForgotPasswordScreen";

import { PageWrapper } from "../components/PageWrapper";
import {
  LoginPath,
  RegisterPath,
  HomePath,
  MapPath,
  ProfilePath,
  SettingPath,
  ShopPath,
  ForgotPassPath,
} from "../constants/path";
import { Header } from "../components/Header";

const {
  Screen: StackScreen,
  Navigator: StackNavigator,
} = createStackNavigator();
const {
  Screen: DrawerScreen,
  Navigator: DrawerNavigator,
} = createDrawerNavigator();

const MainLayout = ({ component, hideHeader = false }) => {
  return (
    <>
      <PageWrapper hideHeader={hideHeader}>{component()}</PageWrapper>
    </>
  );
};

export const Navigator = () => {
  const [welcome, setWelcome] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  return welcome ? (
    <WelcomeScreen onFinish={() => setWelcome(false)} />
  ) : (
    <NavigationContainer>
      {!isAuth ? (
        <StackNavigator
          screenOptions={{ headerShown: false }}
          initialRouteName={LoginPath}
        >
          <StackScreen name={LoginPath}>
            {(props) => (
              <MainLayout
                component={() => (
                  <LoginScreen {...props} onLogin={() => setIsAuth(true)} />
                )}
                hideHeader
              />
            )}
          </StackScreen>

          <StackScreen name={RegisterPath}>
            {(props) => (
              <MainLayout
                component={() => <SignupScreen {...props} />}
                hideHeader
              />
            )}
          </StackScreen>

          <StackScreen name={ForgotPassPath}>
            {(props) => (
              <MainLayout
                component={() => <ForgotPasswordScreen {...props} />}
                hideHeader
              />
            )}
          </StackScreen>
        </StackNavigator>
      ) : (
        <DrawerNavigator initialRouteName={SettingPath} backBehavior="history">
          <DrawerScreen name={HomePath}>
            {(props) => (
              <MainLayout component={() => <HomeScreen {...props} />} />
            )}
          </DrawerScreen>
          <DrawerScreen name={MapPath}>
            {(props) => (
              <MainLayout component={() => <MapScreen {...props} />} />
            )}
          </DrawerScreen>
          <DrawerScreen name={ProfilePath}>
            {(props) => (
              <MainLayout component={() => <ProfileScreen {...props} />} />
            )}
          </DrawerScreen>
          <DrawerScreen name={SettingPath}>
            {(props) => (
              <MainLayout component={() => <SettingScreen {...props} />} />
            )}
          </DrawerScreen>
          <DrawerScreen name={ShopPath}>
            {(props) => (
              <MainLayout component={() => <ShopScreen {...props} />} />
            )}
          </DrawerScreen>
        </DrawerNavigator>
      )}
    </NavigationContainer>
  );
};

/*<LogRegButton
          text="Toggle"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        ></LogRegButton> */
