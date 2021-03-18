import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as firebase from "firebase";
import { OKICOLOR } from "../constants/palette";
import icons from "../constants/icons";

export const MapScreen = () => {
  const [pharmacies, setPharmacies] = useState([]);

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

  console.log(markers);

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
            calloutOffset={{ x: 0, y: 40 }}
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
            <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Image style={styles.image} source={{ uri: marker.image }} />
                  {/* <Text style={styles.name}>{marker.name}</Text> */}
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
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
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderRadius: 6,
    borderColor: "#ccc",
    padding: 5,
    width: 150,
    height: 100,
  },
  name: {
    fontSize: 15,
    marginBottom: 0,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
