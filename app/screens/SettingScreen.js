import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { Text, Button, View } from "react-native";

const handleClick = (product, props) => {
  props.addToCart(product);
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch({ type: "ADD_ITEM", payload: product });
    },
  };
};

const SettingScreen = (props) => {
  const [products, setProducts] = useState();
  const [isDBReady, setIsDBReady] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    let temp = [];
    await firebase
      .firestore()
      .collection("Products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          temp.push(doc.data());
        });
      });
    setProducts(temp);
    setIsDBReady(true);
  };

  if (isDBReady) {
    let productList = products.map((product) => {
      return (
        <View>
          <Text>id: {product.id}</Text>
          <Text>title: {product.name}</Text>
          <Text>price: {product.price} €</Text>
          <Button
            title="buy"
            onPress={() => {
              handleClick(product, props);
            }}
          ></Button>
        </View>
      );
    });
    return (
      <View>
        <Text>{productList}</Text>
      </View>
    );
  } else {
    return null;
  }
};

export default connect(null, mapDispatchToProps)(SettingScreen);
