import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as firebase from "firebase";
import { OKICOLOR } from "../constants/palette";
import icons from "../constants/icons";

export const MapScreen = () => {
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
    setModalVisible(temp.map(() => false))
  };

  let markers = pharmacies.map((a) => {
    return {
      coordinates: {
        latitude: a.location.latitude,
        longitude: a.location.longitude,
      },
      name: a.name,
      image: a.image,
    };
  });

  console.log(modalVisible);
  
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
            onPress={() => setModalVisible(modalVisible.map((value, modalIndex) => modalIndex === index))}
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
                        <Text>{marker.name}</Text>
      
                        {/* <Image
                          style={styles.image}
                          source={{ uri: marker.image }}
                        /> */}
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
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  imageContainer: {
    flexDirection: "row",
    alignContent: "center",
    backgroundColor: "white",
    borderRadius: 6,
    borderColor: "#ccc",
    padding: 5,
    width: "80%",
    height: "80%",
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
