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
import { LIGHTGREY, OKICOLOR, RAISINBLACK } from "../constants/palette";
import { ProductPath } from "../constants/path";

export const HomeScreen = ({ navigation }) => {
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

  const renderMainCategories = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
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
              borderRadius: 45,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedCategory?.id == item.id ? "white" : OKICOLOR,
            }}
          >
            <Image
              source={{ uri: item.icon }}
              style={{
                width: 50,
                height: 50,
                //resizeMethod: "contain",
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
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>Main Categories</Text>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      </View>
    );
  };

  const renderProductList = () => {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() =>
          navigation.navigate(ProductPath, {
            item,
          })
        }
      >
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
              width: SIZES.width * 0.3,
              backgroundColor: "white",
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>{item.price} €</Text>
          </View>
        </View>
        {/* Restaurant Info */}
        <Text style={{ ...FONTS.body2 }}>{item.name}</Text>
        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: "row",
          }}
        >
          {/* Categories */}
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
            }}
          >
            {item.category.map((categoryId) => {
              return (
                <View style={{ flexDirection: "row" }} key={categoryId}>
                  <Text style={{ ...FONTS.body3 }}>
                    {getCategoryByNameId(categoryId)}
                  </Text>
                  <Text style={{ ...FONTS.h3, color: LIGHTGREY }}> . </Text>
                </View>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <>
        {!displayTitle ? null : (
          <Text style={styles.title}>Best selling products</Text>
        )}
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
      {renderMainCategories()}
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
  title: {
    fontFamily: "MontserratBold",
    fontSize: SIZES.h1,
    lineHeight: 36,
    textAlign: "center",
  },
});
