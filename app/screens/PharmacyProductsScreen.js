import React, { useEffect, useState } from "react";
import { ScrollView, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { ProductPath } from "../constants/path";
import { connect } from "react-redux";
import { useRoute } from "@react-navigation/core";
import { PharmacyComponent } from "../components/PharmacyComponent";
import { ProductListComponent } from "../components/ProductListComponent";
import { Typography } from "../components/Typography";

const PharmacyProductScreen = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
  const [hideStock, setHideStock] = useState(true);

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

  const getStockByItem = (temp) => {
    return temp.stock[item.id - 1];
  };

  function renderPharmacy() {
    return (
      <PharmacyComponent
        source={{ uri: item.image }}
        name={item.name}
        address={item.address}
        open={item.open}
        close={item.close}
        imgStyleOverride={{ borderRadius: 0, height: 250 }}
        mainInfoOverride={{ position: "absolute", top: "60%" }}
        hideStock={hideStock}
      />
    );
  }

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
        getStock={getStockByItem(item)}
        onPressCart={() => {
          handleClick(item, props);
        }}
        map={item.category.map((categoryId) => {
          return (
            <View style={{ flexDirection: "row" }} key={categoryId}>
              <Typography variantName="TextProduct">
                Category: {getCategoryByNameId(categoryId)}
              </Typography>
            </View>
          );
        })}
      />
    );

    return (
      <>
        <Typography variantName="Title">
          Products available in this pharmacy
        </Typography>
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
      </>
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
