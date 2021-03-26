import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as firebase from "firebase";
import { OKICOLOR } from "../constants/palette";
import { SIZES, FONTS } from "../constants/theme";
import icons from "../constants/icons";
import { LogRegButton } from "../components/LogRegButton";
import { PharmacyProductsPath } from "../constants/path";

export const MapScreen = (props) => {
  const [pharmacies, setPharmacies] = useState([]);
  const [modalVisible, setModalVisible] = useState([]);

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

  let markers = pharmacies.map((a) => {
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

  return (
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
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinates}
            onPress={() =>
              setModalVisible(
                modalVisible.map((value, modalIndex) => modalIndex === index)
              )
            }
          >
            <View
              style={{
                height: 60,
                width: 50,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: OKICOLOR,
                }}
              >
                <Image
                  source={icons.pin}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: "white",
                  }}
                />
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible[index]}
              key={index}
            >
              <TouchableOpacity
                style={styles.centeredView}
                activeOpacity={1}
                onPressOut={() => {
                  setModalVisible(modalVisible.map(() => false));
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.image}
                        source={{ uri: marker.image }}
                      />
                      <View
                        style={{
                          position: "absolute",
                          bottom: 0,
                          height: 50,
                          width: SIZES.width * 0.7,
                          backgroundColor: "white",
                          borderTopRightRadius: SIZES.radius,
                          alignItems: "flex-start",
                          ...styles.shadow,
                          opacity: 0.8,
                        }}
                      >
                        <View
                          style={{
                            position: "absolute",
                            left: 7,
                          }}
                        >
                          <Text style={{ ...FONTS.h2 }}>{marker.name}</Text>
                          <Text style={{ ...FONTS.body3 }}>
                            {marker.address} {"   "} {marker.open} -{" "}
                            {marker.close}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        width: SIZES.width * 0.9,
                        position: "absolute",
                        bottom: 30,
                        alignItems: "center",
                        alignSelf: "center",
                      }}
                    >
                      <LogRegButton
                        text="Go To Pharmacy Page"
                        onPress={() => {
                          props.navigation.navigate(PharmacyProductsPath, {
                            marker,
                          }),
                            setModalVisible(modalVisible.map(() => false));
                        }}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Modal>
          </Marker>
        ))}
      </MapView>
    </View>
  );
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
  imageContainer: {
    flexDirection: "column",
    alignContent: "center",
    backgroundColor: "white",
    borderRadius: 6,
    borderColor: "#ccc",
    padding: 5,
    width: "100%",
    height: "70%",
    alignSelf: "center",
    position: "absolute",
    top: 0,
  },
  name: {
    fontSize: 15,
    marginBottom: 0,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignSelf: "center",
    width: "100%",
    height: "60%",
    bottom: 20,
  },
  modalView: {
    flex: 0.3,
    backgroundColor: "#f8f8ff",
    borderRadius: 10,
    justifyContent: "center",
    width: "100%",
    marginVertical: -40,
    alignSelf: "center",
  },
});
