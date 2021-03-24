import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";
import {
  ERRORCOLOR,
  LIGHTGREY,
  OKICOLOR,
  RAISINBLACK,
  WHITE,
} from "../constants/palette";
import { connect } from "react-redux";
import { SIZES, FONTS } from "../constants/theme";
import { LogRegButton } from "../components/LogRegButton";
import { ScrollView } from "react-native";

const ProductScreen = (props) => {
  const [categories, setCategories] = useState([]);
  const [saved, setSaved] = useState([]);
  const { route } = props;
  const { item } = route.params;
  const [productQty, setQuantity] = useState(1);
  const [pharmacies, setPharmacies] = useState([]);
  const [iconSaved, setIconSaved] = useState(true);

  useEffect(() => {
    loadElements();
  }, []);

  const loadElements = async () => {
    await firebase
      .firestore()
      .collection("Purchases")
      .doc(firebase.auth().currentUser.email)
      .onSnapshot((documentSnapshot) => {
        setSaved(documentSnapshot.data().saved);
      });

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

  const handleClick = (id) => {
    if (!saved.includes(id)) {
      //console.log(item.id);
      firebase
        .firestore()
        .collection("Purchases")
        .doc(firebase.auth().currentUser.email)
        .update({
          saved: firebase.firestore.FieldValue.arrayUnion(item.id),
        });
    }
    if (saved.includes(id)) {
      //console.log(item.id);
      firebase
        .firestore()
        .collection("Purchases")
        .doc(firebase.auth().currentUser.email)
        .update({
          saved: firebase.firestore.FieldValue.arrayRemove(item.id),
        });
    }
  };

  let pharmacyList = pharmacies.filter((a) => item.pharmacy.includes(a.id));

  let categoriesIcons = item.category.map((index) => {
    return (
      <View style={{ flexDirection: "row" }} key={index}>
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
      <View style={{ flexDirection: "row" }} key={index}>
        <Text style={{ ...FONTS.body3, color: LIGHTGREY }}>
          {categories.length > 0 ? categories[index - 1].name : null}
        </Text>
      </View>
    );
  });

  function editOrder(action) {
    let temp = productQty;
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
            <View
              style={{ borderBottomColor: RAISINBLACK, borderBottomWidth: 1 }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: SIZES.width,
                  height: "100%",
                }}
              />
            </View>

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
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
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
                  borderTopColor: RAISINBLACK,
                  borderTopWidth: 1,
                  borderBottomColor: RAISINBLACK,
                  borderBottomWidth: 1,
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
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderRightWidth: 1,
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
              {item.name} - {item.price}€
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
          <TouchableOpacity
            onPress={() => {
              handleClick(item.id);
            }}
          >
            {!saved.length ? null : saved.includes(item.id) ? (
              <Icon
                style={styles.buttonProduct}
                type="material-community"
                name={"heart"}
                color={ERRORCOLOR}
                size={32}
              />
            ) : (
              <Icon
                style={styles.buttonProduct}
                type="material-community"
                name={"heart-outline"}
                color={ERRORCOLOR}
                size={32}
              />
            )}
          </TouchableOpacity>
          {/* Order Button */}
          <View
            style={{
              width: SIZES.width * 0.9,
              marginBottom: 10,
            }}
          >
            <LogRegButton
              text="Add to Cart"
              onPress={() => {
                handleClick(item, productQty, props);
                setQuantity(1);
              }}
            />
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
          style={{
            marginBottom: SIZES.padding,
            borderRadius: SIZES.radius,
            borderColor: RAISINBLACK,
            borderWidth: 1,
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: SIZES.radius,
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
              opacity: 0.8,
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
    <ScrollView>
      {renderProductInfo()}
      {renderPharmaciesList()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "MontserratBold",
    fontSize: SIZES.h1,
    lineHeight: 36,
    textAlign: "center",
  },
  buttonProduct: {
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 5,
  },
});

const handleClick = (product, productQty, props) => {
  props.addToCart(product, productQty);
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, quantity) => {
      dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductScreen);
