import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { OKICOLOR, LIGHTBLUE } from "../constants/palette";
import { ProductPath } from "../constants/path";
import { LogRegButton } from "../components/LogRegButton";
import { ProductListComponent } from "../components/ProductListComponent";
import { useNavigation } from "@react-navigation/native";
import { CategoriesComponent } from "../components/CategoriesComponent";
import { Typography } from "../components/Typography";
import { Searchbar } from "react-native-paper";

const HomeScreen = (props) => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [product, setProduct] = useState(); //cambia in base alla categoria selezionata
  const [productDB, setProductDB] = useState(); //rimane fisso con gli stessi dati
  const [isDBReady, setIsDBReady] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(true);
  const [hideStock, setHideStock] = useState(true);
  const navigation = useNavigation();

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
    const renderItem = ({ item }) => (
      <CategoriesComponent
        TouchableOpacityStyling={{
          marginLeft: item.id === 1 ? 10 : 0,
          backgroundColor: selectedCategory?.id == item.id ? OKICOLOR : "white",
          ...styles.shadow,
        }}
        onPress={() => onSelectedCategory(item)}
        ImageContainerStyling={{
          backgroundColor:
            selectedCategory?.id == item.id ? "white" : LIGHTBLUE,
        }}
        name={item.name}
        source={{ uri: item.icon }}
      />
    );

    return (
      <View style={{ paddingTop: 10 }}>
        <Typography variantName="body1">Main Categories</Typography>
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
      <ProductListComponent
        onPressProduct={() =>
          navigation.navigate(ProductPath, {
            item,
          })
        }
        source={{ uri: item.image }}
        name={item.name}
        price={item.price}
        item={item}
        hideStock={hideStock}
        onPressCart={() => {
          handleClick(item, props);
        }}
        map={item.category.map((categoryId) => {
          return (
            <View style={{ flexDirection: "row" }} key={categoryId}>
              <Typography variantName="body4">
                Category: {getCategoryByNameId(categoryId)}
              </Typography>
            </View>
          );
        })}
      />
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
          <Typography variantName="body1">Best selling products</Typography>
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
      <Searchbar
        placeholder={"Search products"}
        value={search}
        onChangeText={(text) => searchFilter(text)}
      />
      {search === "" ? renderMainCategories() : null}
      {renderProductList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
