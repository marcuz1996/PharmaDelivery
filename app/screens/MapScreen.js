import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as firebase from "firebase";
import icons from "../constants/icons";
import { PharmacyProductsPath } from "../constants/path";
import { useNavigation } from "@react-navigation/native";
import { MarkerPinComponent } from "../components/MarkerPinComponent";
import { IOSMapModalComponent } from "../components/IOSMapModalComponent";
import { AndroidMapModalComponent } from "../components/AndroidMapModalComponent";

export const MapScreen = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [modalVisible, setModalVisible] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadElements();
  }, []);

  const loadElements = async () => {
    let temp = [];
    await firebase
      .firestore()
      .collection("Pharmacies")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          temp.push(doc.data());
        });
      });
    setPharmacies(temp);
    setModalVisible(temp.map(() => false));
  };

  const markers = pharmacies.map((a) => {
    return {
      address: a.address,
      close: a.close,
      id: a.id,
      image: a.image,
      coordinates: {
        latitude: a.location.latitude,
        longitude: a.location.longitude,
      },
      name: a.name,
      open: a.open,
    };
  });

  return Platform.OS === 'ios' ? (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 45.46560194591999,
          longitude: 9.190776857002703,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((item, index) => (
          <Marker
            key={index}
            coordinate={item.coordinates}
            onPress={() =>
              setModalVisible(
                modalVisible.map((value, modalIndex) => modalIndex === index)
              )
            }
          >
            <MarkerPinComponent
              icon={icons.pin}
              tintColor={{ tintColor: "white" }}
            />

            <IOSMapModalComponent
              visible={modalVisible[index]}
              key={index}
              onPressOut={() => {
                setModalVisible(modalVisible.map(() => false));
              }}
              source={{ uri: item.image }}
              name={item.name}
              address={item.address}
              open={item.open}
              close={item.close}
              onPress={() => {
                navigation.navigate(PharmacyProductsPath, {
                  item,
                });
                  setModalVisible(modalVisible.map(() => false));
              }}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  ) : 
  <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 45.46560194591999,
          longitude: 9.190776857002703,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((item, index) => (
          <Marker
            key={index}
            coordinate={item.coordinates}
            onPress={() =>
              setModalVisible(
                modalVisible.map((value, modalIndex) => modalIndex === index)
              )
            }
          >
            <MarkerPinComponent
              icon={icons.pin}
              tintColor={{ tintColor: "white" }}
            />

            <AndroidMapModalComponent
              visible={modalVisible[index]}
              key={index}
              onPressOut={() => {
                setModalVisible(modalVisible.map(() => false));
              }}
              source={{ uri: item.image }}
              name={item.name}
              address={item.address}
              open={item.open}
              close={item.close}
              onPress={() => {
                navigation.navigate(PharmacyProductsPath, {
                  item,
                });
                  setModalVisible(modalVisible.map(() => false));
              }}
            />
          </Marker>
        ))}
      </MapView>
    </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
