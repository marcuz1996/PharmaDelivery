import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  View,
} from "react-native";
import * as firebase from "firebase";
import { FONTS, SIZES } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import {
  OKICOLOR,
  RAISINBLACK,
  LIGHTBLUE,
  WHITE,
  LIGHTGREY,
} from "../constants/palette";
import { ProductPath } from "../constants/path";
import { LogRegButton } from "../components/LogRegButton";
import { TextInput } from "react-native";

const HomeScreen = (props) => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [product, setProduct] = useState(); //cambia in base alla categoria selezionata
  const [productDB, setProductDB] = useState(); //rimane fisso con gli stessi dati
  const [isDBReady, setIsDBReady] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(true);

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
    setProduct(temp);
    setProductDB(temp);
    setIsDBReady(true);
  };

  const onSelectedCategory = (category) => {
    setDisplayTitle(false);
    let ProductList = productDB.filter((a) => a.category.includes(category.id));
    setProduct(ProductList);
    setSelectedCategory(category);
  };

  const getCategoryByNameId = (id) => {
    let category = categories.filter((a) => a.id == id);
    if (category.length > 0) return category[0].name;
    return "";
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = productDB.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setProduct(newData);
      setSearch(text);
    } else {
      setProduct(productDB);
      setSearch(text);
    }
  };

  const renderMainCategories = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            marginLeft: item.id === 1 ? 10 : 0,
            padding: 10,
            paddingBottom: 20,
            backgroundColor:
              selectedCategory?.id == item.id ? OKICOLOR : "white",
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
            ...styles.shadow,
            width: 115,
            height: 115,
          }}
          onPress={() => onSelectedCategory(item)}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedCategory?.id == item.id ? "white" : LIGHTBLUE,
            }}
          >
            <Image
              source={{ uri: item.icon }}
              style={{
                width: 50,
                height: 50,
              }}
            />
          </View>
          <Text
            style={{
              marginTop: 2,
              color: selectedCategory?.id == item.id ? "white" : "black",
              ...FONTS.body5,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ paddingTop: 10 }}>
        <Text style={styles.title}>Main Categories</Text>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingVertical: 20,
          }}
        />
      </View>
    );
  };

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
      <>
        {!displayTitle ? (
          <View style={{ marginLeft: 30, marginRight: 30 }}>
            <LogRegButton
              text="SHOW ALL CATEGORIES"
              onPress={() => {
                setDisplayTitle(true);
                setProduct(productDB);
                setSelectedCategory(null);
              }}
            />
          </View>
        ) : search === "" ? (
          <Text style={styles.title}>Best selling products</Text>
        ) : null}
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

  return !isDBReady ? null : (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Icon
          style={{ paddingLeft: 10 }}
          type="font-awesome-5"
          name="search"
          color={LIGHTGREY}
          size={20}
        />
        <TextInput
          style={{
            flex: 1,
            paddingLeft: 10,
            fontFamily: "Montserrat",
            fontSize: 18,
          }}
          value={search}
          placeholder="Search products"
          onChangeText={(text) => searchFilter(text)}
        />
      </View>
      {search === "" ? renderMainCategories() : null}
      {renderProductList()}
    </View>
  );
};

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
  searchBar: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: RAISINBLACK,
    borderRadius: 100,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    padding: 3,
    alignContent: "center",
    alignItems: "center",
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

export default connect(null, mapDispatchToProps)(HomeScreen);
