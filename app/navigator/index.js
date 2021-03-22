import React, { useEffect, useState } from "react";
import * as firebase from "firebase";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerMenu } from "../components/DrawerMenu";

import { WelcomeScreen } from "../screens/WelcomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { SignupScreen } from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import { MapScreen } from "../screens/MapScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import PharmaciesListScreen from "../screens/PharmaciesListScreen";
import ProductScreen from "../screens/ProductScreen";
import ShopCartScreen from "../screens/ShopCartScreen";
import { PrivacyScreen } from "../screens/PrivacyScreen";
import PurchaseScreen from "../screens/PurchaseScreen";
import { AboutUsScreen } from "../screens/AboutUsScreen";
import PaymentScreen from "../screens/PaymentScreen";
import { ForgotPasswordScreen } from "../screens/ForgotPasswordScreen";
import { PageWrapper } from "../components/PageWrapper";
import {
  LoginPath,
  RegisterPath,
  HomePath,
  MapPath,
  ProfilePath,
  PharmaciesListPath,
  ProductPath,
  ShopCartPath,
  ForgotPassPath,
  PrivacyPath,
  AboutUsPath,
  PaymentPath,
  PurchasePath,
} from "../constants/path";

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

export const Navigator = ({ auth }) => {
  const [welcome, setWelcome] = useState(false);
  const [isAuth, setIsAuth] = useState(auth);

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
                component={() => <ForgotPasswordScreen {...props} display />}
                hideHeader
              />
            )}
          </StackScreen>
        </StackNavigator>
      ) : (
        <DrawerNavigator
          initialRouteName={HomePath}
          backBehavior="history"
          drawerContent={(props) => (
            <DrawerMenu {...props} onLogout={() => setIsAuth(false)} />
          )}
        >
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
          <DrawerScreen name={PharmaciesListPath}>
            {(props) => (
              <MainLayout
                component={() => <PharmaciesListScreen {...props} />}
              />
            )}
          </DrawerScreen>
          <DrawerScreen name={ProductPath}>
            {(props) => (
              <MainLayout component={() => <ProductScreen {...props} />} />
            )}
          </DrawerScreen>
          <DrawerScreen name={ShopCartPath}>
            {(props) => (
              <MainLayout component={() => <ShopCartScreen {...props} />} />
            )}
          </DrawerScreen>
          <DrawerScreen name={PrivacyPath}>
            {(props) => (
              <MainLayout component={() => <PrivacyScreen {...props} />} />
            )}
          </DrawerScreen>
          <DrawerScreen name={AboutUsPath}>
            {(props) => (
              <MainLayout component={() => <AboutUsScreen {...props} />} />
            )}
          </DrawerScreen>
          <DrawerScreen name={PaymentPath}>
            {(props) => (
              <MainLayout component={() => <PaymentScreen {...props} />} />
            )}
          </DrawerScreen>
          <DrawerScreen name={ForgotPassPath}>
            {(props) => (
              <MainLayout
                component={() => <ForgotPasswordScreen {...props} />}
              />
            )}
          </DrawerScreen>
          <DrawerScreen name={PurchasePath}>
            {(props) => <PurchaseScreen {...props} />}
          </DrawerScreen>
        </DrawerNavigator>
      )}
    </NavigationContainer>
  );
};
