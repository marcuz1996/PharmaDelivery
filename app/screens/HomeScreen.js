import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  View,
} from "react-native";
import {
  categoryData,
  restaurantData,
  initialCurrentLocation,
} from "../constants/data";
import { FONTS, SIZES } from "../constants/theme";
import icons from "../constants/icons";
import {
  MAINCOLOR,
  SECONDARYCOLOR,
  LINKCOLOR,
  RAISINBLACK,
  LIGHTGREY,
  OKICOLOR,
  GREEN,
  WHITE,
} from "../constants/palette";

export const HomeScreen = () => {
  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [pharmacies, setPharmacies] = React.useState(restaurantData);
  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation
  );

  function renderHeader() {
    return (
      <View
        style={{ flexDirection: "row", height: 50, backgroundColor: OKICOLOR }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: 20,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.nearby}
            //resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              backgroundColor: LIGHTGREY,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>Something to put</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: 20,
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/icon.png")}
            //resizeMethod="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMainCategories() {
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
          }}
          onPress={() => onSelectedCategory(item)}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedCategory?.id == item.id ? "white" : LIGHTGREY,
            }}
          >
            <Image
              source={item.icon}
              //resizeMethod="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>
          <Text
            style={{
              marginTop: 10,
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
        <Text style={{ ...FONTS.h1 }}>Main Categories</Text>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => "${item.id}"}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      </View>
    );
  }

  function onSelectedCategory(category) {
    let PharmacyList = restaurantData.filter((a) =>
      a.categories.includes(category.id)
    );

    setPharmacies(PharmacyList);
    setSelectedCategory(category);
  }

  function getCategoryByNameId(id) {
    let category = categories.filter((a) => a.id == id);

    if (category.length > 0) return category[0].name;

    return "";
  }

  function renderPharmacyList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        //onPress -> navigate to Pharmacy Screen
      >
        {/* Image*/}
        <View
          syle={{
            marginBottom: SIZES.padding,
          }}
        >
          <Image
            source={item.photo}
            resizeMode="cover"
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
              width: SIZES.width * 0.3,
              backgroundColor: "white",
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
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
          {/* Rating */}
          <Image
            source={icons.star}
            style={{
              height: 20,
              width: 20,
              tintColor: OKICOLOR,
              marginRight: 10,
            }}
          />
          <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

          {/* Categories */}
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
            }}
          >
            {item.categories.map((categoryId) => {
              return (
                <View style={{ flexDirection: "row" }} key={categoryId}>
                  <Text style={{ ...FONTS.body3 }}>
                    {getCategoryByNameId(categoryId)}
                  </Text>
                  <Text style={{ ...FONTS.h3, color: LIGHTGREY }}> . </Text>
                </View>
              );
            })}

            {/* Price*/}
            {[1, 2, 3].map((priceRating) => (
              <Text
                key={priceRating}
                style={{
                  ...FONTS.body3,
                  color: priceRating <= item.priceRating ? "black" : LIGHTGREY,
                }}
              >
                $
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={pharmacies}
        keyExtractor={(item) => "${item.id}"}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 30,
        }}
      />
    );
  }
  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderPharmacyList()}
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
