import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import * as firebase from "firebase";
import { LIGHTGREY, OKICOLOR, RAISINBLACK } from "../constants/palette";
import { SIZES, FONTS } from "../constants/theme";

export const ShopScreen = ({ route }) => {
  const [categories, setCategories] = useState([]);
  const { item } = route.params;
  const [productQty, setQuantity] = useState(1);
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    loadElements();
  }, []);

  const loadElements = async () => {
    let temp = [];
    await firebase
      .firestore()
      .collection("Categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          for (let count = 1; count < 8; count++) {
            const obj = {
              id: count,
              name: doc.data()[count][0],
              icon: doc.data()[count][1],
            };
            temp.push(obj);
          }
        });
      });
    setCategories(temp);

    let temp2 = [];
    await firebase
      .firestore()
      .collection("Pharmacies")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          temp2.push(doc.data());
        });
      });

    setPharmacies(temp2);
  };

  let pharmacyList = pharmacies.filter((a) => item.pharmacy.includes(a.id));

  console.log(pharmacies);

  let categoriesIcons = item.category.map((index) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Image
          source={
            categories.length > 0 ? { uri: categories[index - 1].icon } : null
          }
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
          }}
        />
      </View>
    );
  });

  let categoriesNames = item.category.map((index) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={{ ...FONTS.body3, color: LIGHTGREY }}>
          {categories.length > 0 ? categories[index - 1].name : null}
        </Text>
        <Text style={{ ...FONTS.h3, color: LIGHTGREY }}> . </Text>
      </View>
    );
  });

  function editOrder(action) {
    temp = productQty;
    if (action == "+") {
      temp++;
    } else {
      if (temp != 1) temp--;
    }
    setQuantity(temp);
  }

  function renderProductInfo() {
    return (
      <View
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ alignItems: "center" }}>
          <View style={{ height: SIZES.height * 0.35 }}>
            <Image
              source={{ uri: item.image }}
              //resizeMethod="cover"
              style={{
                width: SIZES.width,
                height: "100%",
              }}
            />

            {/* Quantity */}
            <View
              style={{
                position: "absolute",
                bottom: -20,
                width: SIZES.width,
                height: 50,
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 50,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopLeftRadius: 25,
                  borderBottomLeftRadius: 25,
                }}
                onPress={() => editOrder("-")}
              >
                <Text style={{ ...FONTS.body1 }}>-</Text>
              </TouchableOpacity>

              <View
                style={{
                  width: 50,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ ...FONTS.h2 }}>{productQty}</Text>
              </View>
              <TouchableOpacity
                style={{
                  width: 50,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopRightRadius: 25,
                  borderBottomRightRadius: 25,
                }}
                onPress={() => editOrder("+")}
              >
                <Text style={{ ...FONTS.body1 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Name & Description */}
          <View
            style={{
              width: SIZES.width,
              alignItems: "center",
              marginTop: 15,
              paddingHorizontal: SIZES.padding * 2,
            }}
          >
            <Text
              style={{ marginVertical: 10, textAlign: "center", ...FONTS.h2 }}
            >
              {item.name} - {item.price}
            </Text>
            <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
          </View>

          {/* Categories */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            {categoriesIcons}
            {categoriesNames}
          </View>

          {/* Order Button */}
          <View
            style={{
              padding: SIZES.padding * 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: OKICOLOR,
                alignItems: "center",
                borderRadius: SIZES.radius,
              }}
            >
              <Text style={{ color: "white", ...FONTS.h2 }}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const renderPharmaciesList = () => {
    const renderItem = ({ item }) => (
      <TouchableOpacity style={{ marginBottom: 20 }}>
        {/* Image*/}
        <View
          syle={{
            marginBottom: SIZES.padding,
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: SIZES.radius,
              borderColor: RAISINBLACK,
              borderWidth: 0.5,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.4,
              backgroundColor: "white",
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>{item.address}</Text>
          </View>
        </View>
        {/* Pharmacy Info */}
        <Text style={{ ...FONTS.body2 }}>{item.name}</Text>
        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: "row",
          }}
        ></View>
      </TouchableOpacity>
    );

    return (
      <>
        <Text style={styles.title}>Where to find this product</Text>
        <FlatList
          data={pharmacyList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 30,
            paddingTop: 20,
          }}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderProductInfo()}
      {renderPharmaciesList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "MontserratBold",
    fontSize: SIZES.h1,
    lineHeight: 36,
    textAlign: "center",
  },
});
