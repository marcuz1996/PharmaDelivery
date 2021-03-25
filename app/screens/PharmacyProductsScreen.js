import  React, { useEffect, useState} from "react";
import { ScrollView, Image, Text, View, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements"
import { SIZES, FONTS } from "../constants/theme";
import {
  ERRORCOLOR,
  LIGHTGREY,
  OKICOLOR,
  RAISINBLACK,
  WHITE,
  LIGHTBLUE,
} from "../constants/palette";
import * as firebase from "firebase";
import { ProductPath } from "../constants/path";
import { connect } from "react-redux";

const PharmacyProductScreen = (props) => {
  const { route } = props;
  const { item } = route.params;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();

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
    setProducts(temp);
  }; 

  let productsList = products.filter((a) => a.pharmacy.includes(item.id));

  const getCategoryByNameId = (id) => {
    let category = categories.filter((a) => a.id == id);
    if (category.length > 0) return category[0].name;
    return "";
  };

  function renderPharmacy() {
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
              {item.name}
            </Text>
            <Text style={{ ...FONTS.body3 }}>{item.address}</Text>
          </View> 
        </View>
      </View>
    );
  }

  const renderProductList = () => {
    const renderItem = ({ item }) => (
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
    );

    return (
        <FlatList
          data={productsList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 30,
            paddingTop: 20,
          }}
        />
    );
  };

  return (
    <ScrollView>
      {renderPharmacy()}
      {renderProductList()}
    </ScrollView>
  );
};

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

export default connect(null, mapDispatchToProps)(PharmacyProductScreen);

const styles = StyleSheet.create({
  container: {
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
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  title: {
    fontFamily: "MontserratBold",
    fontSize: SIZES.h1,
    lineHeight: 36,
    textAlign: "center",
  },
});

