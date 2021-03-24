import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  View,
  ActivityIndicator,
} from "react-native";
import { SIZES } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { OKICOLOR, RAISINBLACK, LIGHTBLUE, WHITE } from "../constants/palette";
import { ProductPath } from "../constants/path";
import { connect } from "react-redux";

const SavedProductScreen = (props) => {
  const [saved, setSaved] = useState([]);
  const [categories, setCategories] = useState();
  const [product, setProduct] = useState();

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
    temp = [];
    await firebase
      .firestore()
      .collection("Products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          temp.push(doc.data());
        });
      });
    setProduct(temp);
  };

  const getCategoryByNameId = (id) => {
    let category = categories.filter((a) => a.id == id);
    if (category.length > 0) return category[0].name;
    return "";
  };

  const renderProductList = () => {
    const renderItem = ({ item }) =>
      saved.includes(item.id) ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[WHITE, "#80F7FF", LIGHTBLUE]}
          locations={[0.3, 0.7, 1]}
          style={styles.containerProduct}
        >
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(ProductPath, {
                item,
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.imageProduct} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(ProductPath, {
                item,
              })
            }
          >
            <View style={{ justifyContent: "center" }}>
              <Text style={{ ...styles.textProduct, paddingLeft: 20 }}>
                Product: {item.name}
              </Text>
              <Text style={{ ...styles.textProduct, paddingLeft: 20 }}>
                Price: {item.price}€
              </Text>
              {item.category.map((categoryId) => {
                return (
                  <View style={{ flexDirection: "row" }} key={categoryId}>
                    <Text style={{ ...styles.textProduct, paddingLeft: 20 }}>
                      Category: {getCategoryByNameId(categoryId)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 10,
              position: "absolute",
              right: 0,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleClick(item, props);
              }}
            >
              <Icon
                style={styles.buttonProduct}
                type="material-community"
                name="cart-plus"
                color={RAISINBLACK}
                size={32}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      ) : null;

    return (
      <>
        <Text style={styles.title}>Your saved products</Text>
        <FlatList
          data={product}
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

  return !saved || !product ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={OKICOLOR} />
    </View>
  ) : (
    <View style={styles.container}>{renderProductList()}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
  },
  containerProduct: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 30,
    marginBottom: 10,
    paddingRight: 130,
    alignItems: "center",
    height: 90,
  },
  imageProduct: {
    width: 90,
    height: 90,
    borderRadius: 30,

    backgroundColor: WHITE,
  },
  textProduct: {
    fontSize: 14,
    color: RAISINBLACK,
    fontFamily: "Montserrat",
  },
  buttonProduct: {
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    margin: 5,
    borderRadius: 50,
  },
  title: {
    fontFamily: "MontserratBold",
    fontSize: SIZES.h1,
    lineHeight: 36,
    textAlign: "center",
  },
});

const handleClick = (product, props) => {
  props.addToCart(product);
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch({ type: "ADD_ITEM", payload: { product, quantity: 1 } });
    },
  };
};

export default connect(null, mapDispatchToProps)(SavedProductScreen);
