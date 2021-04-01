import React, { useEffect, useState } from "react";
import { View, Image, FlatList } from "react-native";
import * as firebase from "firebase";
import { LIGHTGREY } from "../constants/palette";
import { connect } from "react-redux";
import { SIZES } from "../constants/theme";
import { LogRegButton } from "../components/LogRegButton";
import { ScrollView } from "react-native";
import { PharmacyProductsPath } from "../constants/path";
import { PharmacyComponent } from "../components/PharmacyComponent";
import { Typography } from "../components/Typography";
import { ProductAndButton } from "../components/ProductAndButton";
import { ProductNameAndDescription } from "../components/ProductNameAndDescription";
import { CategoriesAndFavourite } from "../components/CategoriesAndFavourite";
import { CategoriesAndFavouriteTablet } from "../components/CategoriesAndFavouriteTablet";
import * as Device from 'expo-device';

const ProductScreen = (props) => {
  const [categories, setCategories] = useState([]);
  const [saved, setSaved] = useState([]);
  const { route } = props;
  const { item } = route.params;
  const [productQty, setQuantity] = useState(1);
  const [pharmacies, setPharmacies] = useState([]);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    loadElements();
    Device.getDeviceTypeAsync().then((deviceType) => {
      setDeviceId(deviceType);
  });
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

  console.log(deviceId);

  const handleClick = (id) => {
    if (!saved.includes(id)) {
      firebase
        .firestore()
        .collection("Purchases")
        .doc(firebase.auth().currentUser.email)
        .update({
          saved: firebase.firestore.FieldValue.arrayUnion(item.id),
        });
    }
    if (saved.includes(id)) {
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

  const getStockByProductItem = (temp) => {
    return item.stock[temp.id - 1];
  };

  let categoriesIcons = item.category.map((index) => {
    return (
      <View style={{ width: "15%" }} key={index}>
        <Image
          source={
            categories.length > 0 ? { uri: categories[index - 1].icon } : null
          }
          style={{
            width: 20,
            height: 20,
          }}
        />
      </View>
    );
  });

  let categoriesNames = item.category.map((index) => {
    return (
      <View style={{ width: "50%" }} key={index}>
        <Typography variantName="body3" style={{ color: LIGHTGREY }}>
          {categories.length > 0 ? categories[index - 1].name : null}
        </Typography>
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
      <View style={{ alignItems: "center" }}>
        <ProductAndButton
          source={{ uri: item.image }}
          onPressMinus={() => editOrder("-")}
          productQty={productQty}
          onPressPlus={() => editOrder("+")}
        />
        <ProductNameAndDescription
          name={item.name}
          description={item.description}
          price={item.price}
        />
        {deviceId == 1 ? <CategoriesAndFavourite
          categoriesIcons={categoriesIcons}
          categoriesNames={categoriesNames}
          saved={saved}
          onPress={() => {
            handleClick(item.id);
          }}
          id={item.id} 
        /> : <CategoriesAndFavouriteTablet
        categoriesIcons={categoriesIcons}
        categoriesNames={categoriesNames}
        saved={saved}
        onPress={() => {
          handleClick(item.id);
        }}
        id={item.id}
        /> 
      }


        {/* Order Button */}
        <View
          style={{
            width: SIZES.width * 0.9,
            bottom: 20,
          }}
        >
          <LogRegButton
            text="Add to Cart"
            onPress={() => {
              handleAddToCart(item, productQty, props);
              setQuantity(1);
            }}
          />
        </View>
      </View>
    );
  }

  const renderPharmaciesList = () => {
    const renderItem = ({ item }) => (
      <PharmacyComponent
        source={{ uri: item.image }}
        onPress={() =>
          props.navigation.navigate(PharmacyProductsPath, {
            item,
          })
        }
        name={item.name}
        address={item.address}
        open={item.open}
        close={item.close}
        stock={getStockByProductItem(item)}
      />
    );

    return (
      <>
        <Typography variantName={"body1"}>
          Where to find this product
        </Typography>
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

const handleAddToCart = (product, productQty, props) => {
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
